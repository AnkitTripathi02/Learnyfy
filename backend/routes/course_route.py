from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db

from schemas.course_schema import (
    CourseCreate,
    CourseUpdate,
    CourseResponse,
)

from services.course_service import (
    create_course,
    get_all_courses,
    get_course_by_id,
    update_course,
    delete_course,
)

router = APIRouter()

@router.post(
    "/",
    response_model=CourseResponse,
)
def create_new_course(
    course: CourseCreate,
    db: Session = Depends(get_db),
):
    return create_course(
        db=db,
        course=course,
    )

@router.get(
    "/",
    response_model=list[CourseResponse],
)
def get_courses(
    search: str | None = None,
    category: str | None = None,
    level: str | None = None,
    language: str | None = None,
    price: str | None = None,
    duration: str | None = None,
    db: Session = Depends(get_db),
):

    return get_all_courses(
        db=db,
        search=search,
        category=category,
        level=level,
        language=language,
        price=price,
        duration=duration,
    )

@router.get(
    "/{course_id}",
    response_model=CourseResponse,
)
def get_course(
    course_id: UUID,
    db: Session = Depends(get_db),
):

    course = get_course_by_id(
        db,
        course_id,
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    return course

@router.put(
    "/{course_id}",
    response_model=CourseResponse,
)
def update_existing_course(
    course_id: UUID,
    course_data: CourseUpdate,
    db: Session = Depends(get_db),
):

    course = get_course_by_id(
        db,
        course_id,
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    return update_course(
        db,
        course,
        course_data,
    )

@router.delete("/{course_id}")
def delete_existing_course(
    course_id: UUID,
    db: Session = Depends(get_db),
):

    course = get_course_by_id(
        db,
        course_id,
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    delete_course(
        db,
        course,
    )

    return {
        "message": "Course deleted successfully"
    }