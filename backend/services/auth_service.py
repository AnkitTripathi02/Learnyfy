from secrets import token_urlsafe

import requests
from sqlalchemy import func
from sqlalchemy.orm import Session
from config import GOOGLE_CLIENT_ID
from utils.exceptions import AppException

from models.user_model import User
from schemas.auth_schema import UserSignup
from utils.hash import hash_password, verify_password
from utils.jwt import create_access_token


def signup_user(db: Session, user: UserSignup):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise AppException(
            message="Email already registered.",
            status_code=400,
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        role="student",
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(
    db: Session,
    email: str,
    password: str,
):
    # ==============================
    # CHECK USER EXISTS
    # ==============================
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise AppException(
            message="Account not found. Please sign up first.",
            status_code=404,
        )

    # ==============================
    # CHECK PASSWORD
    # ==============================
    if not verify_password(
        password,
        user.password,
    ):
        raise AppException(
            message="Invalid email or password.",
            status_code=401,
        )

    # ==============================
    # CREATE ACCESS TOKEN
    # ==============================
    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    # ==============================
    # LOGIN RESPONSE
    # ==============================
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "profile_image": user.profile_image,
            "is_email_verified": user.is_email_verified,
            "is_active": user.is_active,
        },
    }


def google_login_user(db: Session, access_token: str):
    if not GOOGLE_CLIENT_ID:
        raise AppException(
            message="Google sign-in is not configured on the server.",
            status_code=503,
        )

    try:
        token_response = requests.get(
            "https://oauth2.googleapis.com/tokeninfo",
            params={"access_token": access_token},
            timeout=5,
        )
    except requests.RequestException:
        raise AppException(
            message="Google sign-in is temporarily unavailable. Please try again.",
            status_code=503,
        )

    if token_response.status_code != 200:
        raise AppException(
            message="Google sign-in could not verify your account. Please try again.",
            status_code=401,
        )

    token_info = token_response.json()
    if token_info.get("aud") != GOOGLE_CLIENT_ID:
        raise AppException(
            message="Google sign-in token was issued for a different application.",
            status_code=401,
        )

    try:
        userinfo_response = requests.get(
            "https://openidconnect.googleapis.com/v1/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
            timeout=5,
        )
    except requests.RequestException:
        raise AppException(
            message="Google sign-in is temporarily unavailable. Please try again.",
            status_code=503,
        )

    if userinfo_response.status_code != 200:
        raise AppException(
            message="Google sign-in could not verify your account. Please try again.",
            status_code=401,
        )

    identity = userinfo_response.json()
    if identity.get("sub") != token_info.get("sub"):
        raise AppException(
            message="Google sign-in could not verify your account. Please try again.",
            status_code=401,
        )

    email = identity.get("email")
    if not email or not identity.get("email_verified") or not identity.get("sub"):
        raise AppException(
            message="Google did not provide a verified email address.",
            status_code=401,
        )

    normalized_email = email.lower()
    user = (
        db.query(User)
        .filter(func.lower(User.email) == normalized_email)
        .first()
    )

    if user and not user.is_active:
        raise AppException(
            message="This account is currently disabled.",
            status_code=403,
        )

    if not user:
        user = User(
            full_name=(identity.get("name") or normalized_email.split("@")[0])[:100],
            email=normalized_email,
            role="student",
            password=hash_password(token_urlsafe(32)),
            profile_image=identity.get("picture"),
            is_email_verified=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    elif not user.is_email_verified:
        user.is_email_verified = True
        db.commit()
        db.refresh(user)

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "profile_image": user.profile_image,
            "is_email_verified": user.is_email_verified,
            "is_active": user.is_active,
        },
    }