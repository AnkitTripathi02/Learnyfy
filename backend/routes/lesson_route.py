from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from database import get_db

from schemas.lesson_schema import (
    LessonCreate,
    LessonUpdate,
    LessonResponse,
)

from services.lesson_service import (
    create_lesson,
    get_lessons_by_module,
    get_lesson_by_id,
    update_lesson,
    delete_lesson,
)

router = APIRouter()


@router.post(
    "/modules/{module_id}/lessons",
    response_model=LessonResponse
)
def create_new_lesson(
    module_id: UUID,
    lesson: LessonCreate,
    db: Session = Depends(get_db),
):

    return create_lesson(
        db,
        module_id,
        lesson
    )


@router.get(
    "/modules/{module_id}/lessons",
    response_model=list[LessonResponse]
)
def get_module_lessons(
    module_id: UUID,
    db: Session = Depends(get_db),
):

    return get_lessons_by_module(
        db,
        module_id
    )


@router.put(
    "/lessons/{lesson_id}",
    response_model=LessonResponse
)
def update_existing_lesson(
    lesson_id: UUID,
    lesson_data: LessonUpdate,
    db: Session = Depends(get_db),
):

    lesson = get_lesson_by_id(
        db,
        lesson_id
    )

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found"
        )

    return update_lesson(
        db,
        lesson,
        lesson_data
    )


@router.delete(
    "/lessons/{lesson_id}"
)
def delete_existing_lesson(
    lesson_id: UUID,
    db: Session = Depends(get_db),
):

    lesson = get_lesson_by_id(
        db,
        lesson_id
    )

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found"
        )

    delete_lesson(
        db,
        lesson
    )

    return {
        "message": "Lesson deleted successfully"
    }