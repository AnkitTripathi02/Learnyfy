from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user_model import User
from schemas.profile_schema import ProfileUpdate, PasswordUpdate
from utils.auth import get_current_user
from utils.hash import verify_password, hash_password


router = APIRouter()


@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "message": "Profile fetched successfully",
        "data": {
            "id": str(current_user.id),
            "full_name": current_user.full_name,
            "email": current_user.email,
            "role": current_user.role,
            "profile_image": current_user.profile_image,
        },
    }


@router.put("/me")
def update_profile(
    profile: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    current_user.full_name = profile.full_name
    current_user.email = profile.email

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "data": {
            "id": str(current_user.id),
            "full_name": current_user.full_name,
            "email": current_user.email,
            "role": current_user.role,
            "profile_image": current_user.profile_image,
        },
    }


@router.put("/password")
def update_password(
    password_data: PasswordUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Check current password
    if not verify_password(
        password_data.current_password,
        current_user.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect.",
        )

    # Check if new password is same as old password
    if verify_password(
        password_data.new_password,
        current_user.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="New password must be different from current password.",
        )

    # Hash and save new password
    current_user.password = hash_password(
        password_data.new_password
    )

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Password updated successfully"
    }