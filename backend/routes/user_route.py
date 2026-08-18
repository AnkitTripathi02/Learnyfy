from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from schemas.user_schema import UserProfileUpdate
from services.user_service import update_user_profile
from schemas.auth_schema import UserResponse
from utils.response import success_response

from fastapi import HTTPException
from services.user_service import (
    get_all_students,
    delete_student,
    toggle_student_status,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.put("/{user_id}", response_model=None)
def update_profile(
    user_id: UUID,
    user_data: UserProfileUpdate,
    db: Session = Depends(get_db),
):

    user = update_user_profile(
        db,
        user_id,
        user_data,
    )

    return success_response(
        message="Profile updated successfully.",
        data={
            "id": str(user.id),
            "full_name": user.full_name,
            "email": user.email,
            "profile_image": user.profile_image,
            "role": user.role,
            "is_email_verified": user.is_email_verified,
            "is_active": user.is_active,
        },
    )

@router.get("/students")
def students(db: Session = Depends(get_db)):
    try:
        students = get_all_students(db)

        return success_response(
            message="Students fetched successfully.",
            data=[
                {
                    "id": str(student.id),
                    "full_name": student.full_name,
                    "email": student.email,
                    "profile_image": student.profile_image,
                    "role": student.role,
                    "is_email_verified": student.is_email_verified,
                    "is_active": student.is_active,
                    "created_at": student.created_at.isoformat()
                    if student.created_at
                    else None,
                }
                for student in students
            ],
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise

@router.delete("/students/{user_id}")
def delete_student_api(
    user_id: UUID,
    db: Session = Depends(get_db),
):
    deleted = delete_student(db, user_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    return success_response(
        message="Student deleted successfully.",
    )

@router.patch("/students/{user_id}/status")
def change_status(
    user_id: UUID,
    db: Session = Depends(get_db),
):
    user = toggle_student_status(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    return success_response(
        message="Status updated successfully.",
        data={
            "id": str(user.id),
            "is_active": user.is_active,
        },
    )