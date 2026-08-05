from uuid import UUID
from schemas.enrollment_schema import (
    EnrollmentCreate,
    EnrollmentResponse,
    MyCourseResponse
)
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.enrollment_schema import MyCourseResponse

from database import get_db

from schemas.enrollment_schema import (
    EnrollmentCreate,
    EnrollmentResponse,
)

from services.enrollment_service import (
    enroll_course,
    get_my_courses,
    delete_enrollment,
    get_enrollment_by_id,
)

router = APIRouter()


@router.post(
    "/courses/{course_id}/enroll",
    response_model=EnrollmentResponse,
)
def enroll(
    course_id: UUID,
    data: EnrollmentCreate,
    db: Session = Depends(get_db),
):
    return enroll_course(
        db,
        course_id,
        data.user_id,
    )


@router.get(
    "/my-courses/{user_id}",
    response_model=list[MyCourseResponse],
)
def my_courses(
    user_id: UUID,
    db: Session = Depends(get_db),
):
    return get_my_courses(
        db,
        user_id,
    )


@router.delete(
    "/enrollment/{enrollment_id}",
)
def remove_enrollment(
    enrollment_id: int,
    db: Session = Depends(get_db),
):
    enrollment = get_enrollment_by_id(
        db,
        enrollment_id,
    )

    if not enrollment:
        raise HTTPException(
            status_code=404,
            detail="Enrollment not found",
        )

    delete_enrollment(
        db,
        enrollment,
    )

    return {
        "message": "Enrollment deleted successfully"
    }