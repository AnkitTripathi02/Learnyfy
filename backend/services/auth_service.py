from sqlalchemy.orm import Session
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