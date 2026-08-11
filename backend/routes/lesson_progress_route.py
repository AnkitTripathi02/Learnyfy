from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from schemas.lesson_progress_schema import (
    LessonProgressCreate,
    LessonProgressResponse,
    CourseProgressResponse,
)

from services.lesson_progress_service import (
    mark_lesson_completed,
    get_course_progress,
)


router = APIRouter()


@router.post(
    "/courses/{course_id}/lessons/{lesson_id}/complete",
    response_model=LessonProgressResponse,
)
def complete_lesson(
    course_id: UUID,
    lesson_id: UUID,
    data: LessonProgressCreate,
    db: Session = Depends(get_db),
):

    return mark_lesson_completed(
        db=db,
        user_id=data.user_id,
        course_id=course_id,
        lesson_id=lesson_id,
    )


@router.get(
    "/courses/{course_id}/progress/{user_id}",
    response_model=CourseProgressResponse,
)
def course_progress(
    course_id: UUID,
    user_id: UUID,
    db: Session = Depends(get_db),
):

    return get_course_progress(
        db=db,
        user_id=user_id,
        course_id=course_id,
    )