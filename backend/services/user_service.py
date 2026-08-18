from sqlalchemy.orm import Session
from sqlalchemy import or_

from models.user_model import User
from schemas.user_schema import UserProfileUpdate
from utils.exceptions import AppException
from models.user_model import User


def update_user_profile(
    db: Session,
    user_id,
    user_data: UserProfileUpdate,
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise AppException(
            message="User not found.",
            status_code=404,
        )

    # Check whether email is already used
    existing_user = (
        db.query(User)
        .filter(
            User.email == user_data.email,
            User.id != user_id,
        )
        .first()
    )

    if existing_user:
        raise AppException(
            message="Email already registered by another user.",
            status_code=400,
        )

    user.full_name = user_data.full_name
    user.email = user_data.email
    user.profile_image = user_data.profile_image

    db.commit()
    db.refresh(user)

    return user


def get_all_students(db):
    return (
        db.query(User)
        .filter(User.role == "student")
        .order_by(User.created_at.desc())
        .all()
    )


def delete_student(db, user_id):
    user = (
        db.query(User)
        .filter(User.id == user_id, User.role == "student")
        .first()
    )

    if not user:
        return None

    db.delete(user)
    db.commit()

    return True


def toggle_student_status(db, user_id):
    user = (
        db.query(User)
        .filter(User.id == user_id, User.role == "student")
        .first()
    )

    if not user:
        return None

    user.is_active = not user.is_active

    db.commit()
    db.refresh(user)

    return user