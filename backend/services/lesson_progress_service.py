from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.lesson_progress_model import LessonProgress
from models.lesson_model import Lesson
from models.course_model import Course
from models.module_model import Module


def mark_lesson_completed(
    db: Session,
    user_id,
    course_id,
    lesson_id,
):

    course = (
        db.query(Course)
        .filter(Course.id == course_id)
        .first()
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    lesson = (
        db.query(Lesson)
        .join(
            Module,
            Lesson.module_id == Module.id,
        )
        .filter(
            Lesson.id == lesson_id,
            Module.course_id == course_id,
        )
        .first()
    )

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found for this course",
        )

    progress = (
        db.query(LessonProgress)
        .filter(
            LessonProgress.user_id == user_id,
            LessonProgress.lesson_id == lesson_id,
        )
        .first()
    )

    if progress:

        progress.is_completed = True
        progress.completed_at = datetime.utcnow()

    else:

        progress = LessonProgress(
            user_id=user_id,
            course_id=course_id,
            lesson_id=lesson_id,
            is_completed=True,
            completed_at=datetime.utcnow(),
        )

        db.add(progress)

    db.commit()
    db.refresh(progress)

    return progress


def get_course_progress(
    db: Session,
    user_id,
    course_id,
):

    total_lessons = (
        db.query(Lesson)
        .join(Module, Lesson.module_id == Module.id)
        .filter(Module.course_id == course_id)
        .count()
    )

    completed_lessons = (
        db.query(LessonProgress)
        .join(Lesson, LessonProgress.lesson_id == Lesson.id)
        .join(Module, Lesson.module_id == Module.id)
        .filter(
            LessonProgress.user_id == user_id,
            LessonProgress.course_id == course_id,
            LessonProgress.is_completed == True,
            Module.course_id == course_id,
        )
        .count()
    )

    completed_lesson_list = (
        db.query(LessonProgress.lesson_id)
        .filter(
            LessonProgress.user_id == user_id,
            LessonProgress.course_id == course_id,
            LessonProgress.is_completed == True,
        )
        .all()
    )

    if total_lessons == 0:
        progress = 0
    else:
        progress = round(
            (completed_lessons / total_lessons) * 100
        )

    is_completed = (
        total_lessons > 0
        and completed_lessons >= total_lessons
    )

    return {
        "course_id": course_id,
        "total_lessons": total_lessons,
        "completed_lessons": completed_lessons,
        "completed_lesson_list": completed_lesson_list,
        "progress_percentage": progress,
        "is_completed": is_completed,
    }