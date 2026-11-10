from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi import HTTPException

from models.course_model import Course
from models.enrollment_model import Enrollment
from models.lesson_model import Lesson
from models.lesson_progress_model import LessonProgress
from models.module_model import Module
from services.notification_service import create_notification

from datetime import datetime, timezone, timedelta


# =============================================================
# ENROLL COURSE
# =============================================================

def enroll_course(
    db: Session,
    course_id,
    user_id,
):
    # =========================================================
    # CHECK COURSE
    # =========================================================
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

    # =========================================================
    # CHECK EXISTING ENROLLMENT
    # =========================================================
    existing = (
        db.query(Enrollment)
        .filter(
            Enrollment.course_id == course_id,
            Enrollment.user_id == user_id,
        )
        .first()
    )

    # =========================================================
    # EXISTING ENROLLMENT
    # =========================================================
    if existing:

        now = datetime.now(timezone.utc)

        # =====================================================
        # EXPIRED ENROLLMENT
        # =====================================================
        if (
            existing.expires_at
            and existing.expires_at <= now
            and course.access_duration_days
        ):
            existing.expires_at = (
                now + timedelta(
                    days=course.access_duration_days
                )
            )

            existing.isactive = True
            existing.updated_at = now

            db.commit()
            db.refresh(existing)

            return existing

        # =====================================================
        # LIFETIME COURSE
        # OR
        # ACTIVE ENROLLMENT
        # =====================================================
        raise HTTPException(
            status_code=400,
            detail="You are already enrolled in this course.",
        )

    # =========================================================
    # CREATE NEW ENROLLMENT
    # =========================================================

    expires_at = None

    if course.access_duration_days:
        expires_at = (
            datetime.now(timezone.utc)
            + timedelta(
                days=course.access_duration_days
            )
        )

    enrollment = Enrollment(
        course_id=course_id,
        user_id=user_id,
        isactive=True,
        expires_at=expires_at,
    )

    db.add(enrollment)
    create_notification(
        db,
        user_id,
        "Enrollment confirmed",
        f"You are now enrolled in {course.title}.",
        "success",
    )
    db.commit()
    db.refresh(enrollment)

    return enrollment


# =============================================================
# GET MY COURSES
# =============================================================

def get_my_courses(
    db: Session,
    user_id,
):
    records = (
        db.query(
            Enrollment,
            Course
        )
        .join(
            Course,
            Enrollment.course_id == Course.id
        )
        .filter(
            Enrollment.user_id == user_id
        )
        .all()
    )

    lesson_totals = dict(
        db.query(
            Module.course_id,
            func.count(Lesson.id),
        )
        .join(Lesson, Lesson.module_id == Module.id)
        .join(Enrollment, Enrollment.course_id == Module.course_id)
        .filter(Enrollment.user_id == user_id)
        .group_by(Module.course_id)
        .all()
    )

    completed_totals = dict(
        db.query(
            Module.course_id,
            func.count(LessonProgress.id),
        )
        .join(Lesson, Lesson.module_id == Module.id)
        .join(LessonProgress, LessonProgress.lesson_id == Lesson.id)
        .join(Enrollment, Enrollment.course_id == Module.course_id)
        .filter(
            Enrollment.user_id == user_id,
            LessonProgress.user_id == user_id,
            LessonProgress.course_id == Module.course_id,
            LessonProgress.is_completed.is_(True),
        )
        .group_by(Module.course_id)
        .all()
    )

    result = []

    for enrollment, course in records:

        now = datetime.now(timezone.utc)

        days_remaining = None
        access_status = "LIFETIME"

        # =====================================================
        # EXPIRY CHECK
        # =====================================================

        if enrollment.expires_at:

            remaining = enrollment.expires_at - now

            days_remaining = max(
                0,
                remaining.days
            )

            # EXPIRED
            if enrollment.expires_at <= now:

                access_status = "EXPIRED"

            # EXPIRING SOON
            elif days_remaining <= 7:

                access_status = "EXPIRING_SOON"

            # ACTIVE
            else:

                access_status = "ACTIVE"

        # =====================================================
        # RESPONSE
        # =====================================================
        total_lessons = lesson_totals.get(course.id, 0)
        completed_lessons = completed_totals.get(course.id, 0)
        progress = (
            round(completed_lessons / total_lessons * 100)
            if total_lessons
            else 0
        )

        result.append({
            "id": enrollment.id,
            "course_id": course.id,
            "title": course.title,
            "description": course.description,
            "thumbnail": course.thumbnail,

            "progress": progress,
            "is_completed": total_lessons > 0 and completed_lessons >= total_lessons,

            "enrolled_at": enrollment.created_at,
            "expires_at": enrollment.expires_at,

            "days_remaining": days_remaining,
            "access_status": access_status,
        })

    return result


# =============================================================
# DELETE ENROLLMENT
# =============================================================

def delete_enrollment(
    db: Session,
    enrollment,
):
    db.delete(enrollment)
    db.commit()


# =============================================================
# GET ENROLLMENT BY ID
# =============================================================

def get_enrollment_by_id(
    db: Session,
    enrollment_id: int,
):
    return (
        db.query(Enrollment)
        .filter(
            Enrollment.id == enrollment_id
        )
        .first()
    )