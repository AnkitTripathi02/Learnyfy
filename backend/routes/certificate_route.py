import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db

from models.user_model import User
from models.course_model import Course
from models.module_model import Module
from models.lesson_model import Lesson
from models.lesson_progress_model import LessonProgress

router = APIRouter(
    prefix="/certificate",
    tags=["Certificate"],
)


@router.get("/{course_id}/{user_id}")
def get_certificate(
    course_id: str,
    user_id: str,
    db: Session = Depends(get_db),
):

    # ==========================
    # Student
    # ==========================

    student = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    # ==========================
    # Course
    # ==========================

    course = (
        db.query(Course)
        .filter(Course.id == course_id)
        .first()
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    # ==========================
    # Total Lessons
    # ==========================

    total_lessons = (
        db.query(func.count(Lesson.id))
        .join(
            Module,
            Lesson.module_id == Module.id
        )
        .filter(
            Module.course_id == course_id
        )
        .scalar()
    )

    # ==========================
    # Completed Lessons
    # ==========================

    completed_lessons = (
        db.query(func.count(LessonProgress.id))
        .filter(
            LessonProgress.course_id == course_id,
            LessonProgress.user_id == user_id,
            LessonProgress.is_completed == True
        )
        .scalar()
    )

    # ==========================
    # Validation
    # ==========================

    if total_lessons == 0:
        raise HTTPException(
            status_code=400,
            detail="Course has no lessons."
        )

    if completed_lessons < total_lessons:
        raise HTTPException(
            status_code=400,
            detail="Complete 100% course to unlock certificate."
        )

    # ==========================
    # Response
    # ==========================

    return {

        "student_name": student.full_name,

        "course_name": course.title,

        "instructor_name": course.instructor,

        "completion_date": datetime.now().strftime("%d %B %Y"),

        "certificate_id": f"LF-{uuid.uuid4().hex[:10].upper()}",

        "progress": 100
    }