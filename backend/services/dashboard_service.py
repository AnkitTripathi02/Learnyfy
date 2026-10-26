from sqlalchemy import func
from sqlalchemy.orm import Session

from models.enrollment_model import Enrollment
from models.lesson_progress_model import LessonProgress
from models.lesson_model import Lesson
from models.module_model import Module


def get_dashboard_stats(
    db: Session,
    current_user,
):
    # ==========================================
    # 1. ACTIVE ENROLLED COURSES
    # ==========================================
    total_courses = (
        db.query(func.count(Enrollment.id))
        .filter(
            Enrollment.user_id == current_user.id,
            Enrollment.isactive == True,
        )
        .scalar()
    ) or 0

    # ==========================================
    # 2. TOTAL LESSONS FROM ENROLLED COURSES
    # ==========================================
    total_lessons = (
        db.query(func.count(Lesson.id))
        .join(
            Module,
            Lesson.module_id == Module.id,
        )
        .join(
            Enrollment,
            Enrollment.course_id == Module.course_id,
        )
        .filter(
            Enrollment.user_id == current_user.id,
            Enrollment.isactive == True,
        )
        .scalar()
    ) or 0

    # ==========================================
    # 3. COMPLETED LESSONS
    # ==========================================
    completed_lessons = (
        db.query(func.count(LessonProgress.id))
        .filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.is_completed == True,
            LessonProgress.course_id.in_(
                db.query(Enrollment.course_id).filter(
                    Enrollment.user_id == current_user.id,
                    Enrollment.isactive == True,
                )
            ),
        )
        .scalar()
    ) or 0

    # ==========================================
    # 4. OVERALL PROGRESS
    # ==========================================
    if total_lessons > 0:
        overall_progress = round(
            (completed_lessons / total_lessons) * 100
        )
    else:
        overall_progress = 0

    # ==========================================
    # 5. COMPLETED COURSES
    # ==========================================
    enrolled_course_ids = (
        db.query(Enrollment.course_id)
        .filter(
            Enrollment.user_id == current_user.id,
            Enrollment.isactive == True,
        )
        .all()
    )

    completed_courses = 0

    for (course_id,) in enrolled_course_ids:

        course_total_lessons = (
            db.query(func.count(Lesson.id))
            .join(
                Module,
                Lesson.module_id == Module.id,
            )
            .filter(
                Module.course_id == course_id,
            )
            .scalar()
        ) or 0

        course_completed_lessons = (
            db.query(func.count(LessonProgress.id))
            .filter(
                LessonProgress.user_id == current_user.id,
                LessonProgress.course_id == course_id,
                LessonProgress.is_completed == True,
            )
            .scalar()
        ) or 0

        if (
            course_total_lessons > 0
            and course_completed_lessons >= course_total_lessons
        ):
            completed_courses += 1


    # ==========================================
# 6. LAST ACCESSED LESSON
# ==========================================
    last_progress = (
        db.query(LessonProgress)
        .filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.course_id.in_(
                db.query(Enrollment.course_id).filter(
                    Enrollment.user_id == current_user.id,
                    Enrollment.isactive == True,
                )
            ),
        )
        .order_by(
            LessonProgress.updated_at.desc()
        )
        .first()
    )

    last_course_id = None
    last_lesson_id = None

    if last_progress:
        last_course_id = last_progress.course_id
        last_lesson_id = last_progress.lesson_id

    # ==========================================
    # 7. RECENT ACTIVITY
    # ==========================================
    recent_progress = (
        db.query(
            LessonProgress,
            Lesson.title.label("lesson_title"),
        )
        .join(
            Lesson,
            LessonProgress.lesson_id == Lesson.id,
        )
        .filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.is_completed == True,
        )
        .order_by(
            LessonProgress.completed_at.desc()
        )
        .limit(5)
        .all()
    )

    recent_activity = []

    for progress, lesson_title in recent_progress:
        recent_activity.append({
            "type": "lesson_completed",
            "title": f"Completed {lesson_title}",
            "completed_at": progress.completed_at,
        })

    # ==========================================
    # FINAL RESPONSE
    # ==========================================
    return {
        "total_courses": total_courses,
        "completed_courses": completed_courses,
        "overall_progress": overall_progress,
        "total_lessons": total_lessons,
        "completed_lessons": completed_lessons,
        "recent_activity": recent_activity,
        "last_course_id": last_course_id,
        "last_lesson_id": last_lesson_id,
    }