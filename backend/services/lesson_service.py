from sqlalchemy.orm import Session

from models.lesson_model import Lesson
from schemas.lesson_schema import (
    LessonCreate,
    LessonUpdate,
)


def create_lesson(
    db: Session,
    module_id,
    lesson: LessonCreate,
):

    new_lesson = Lesson(
        module_id=module_id,
        **lesson.model_dump()
    )

    db.add(new_lesson)

    db.commit()

    db.refresh(new_lesson)

    return new_lesson


def get_lessons_by_module(
    db: Session,
    module_id,
):

    return (
        db.query(Lesson)
        .filter(Lesson.module_id == module_id)
        .order_by(Lesson.order)
        .all()
    )


def get_lesson_by_id(
    db: Session,
    lesson_id,
):

    return (
        db.query(Lesson)
        .filter(Lesson.id == lesson_id)
        .first()
    )


def update_lesson(
    db: Session,
    lesson: Lesson,
    lesson_data: LessonUpdate,
):

    for key, value in lesson_data.model_dump(
        exclude_unset=True
    ).items():

        setattr(lesson, key, value)

    db.commit()

    db.refresh(lesson)

    return lesson


def delete_lesson(
    db: Session,
    lesson: Lesson,
):

    db.delete(lesson)

    db.commit()