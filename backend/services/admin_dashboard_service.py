from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from models.user_model import User
from models.course_model import Course
from models.enrollment_model import Enrollment


def get_dashboard_stats(db: Session):

    now = datetime.utcnow()

    week_start = now - timedelta(days=7)
    month_start = now - timedelta(days=30)
    year_start = now - timedelta(days=365)


    # -----------------
    # USERS
    # -----------------

    total_users = db.query(User).count()


    new_users_week = (
        db.query(User)
        .filter(User.created_at >= week_start)
        .count()
    )


    new_users_month = (
        db.query(User)
        .filter(User.created_at >= month_start)
        .count()
    )


    new_users_year = (
        db.query(User)
        .filter(User.created_at >= year_start)
        .count()
    )


    # -----------------
    # COURSES
    # -----------------

    total_courses = db.query(Course).count()


    courses_week = (
        db.query(Course)
        .filter(Course.created_at >= week_start)
        .count()
    )


    courses_month = (
        db.query(Course)
        .filter(Course.created_at >= month_start)
        .count()
    )


    courses_year = (
        db.query(Course)
        .filter(Course.created_at >= year_start)
        .count()
    )


    # -----------------
    # ENROLLMENT
    # -----------------

    total_enrollments = (
        db.query(Enrollment)
        .count()
    )


    # Paid Courses
    paid_data = (
        db.query(
            func.count(Enrollment.id),
            func.sum(Course.price)
        )
        .join(
            Course,
            Enrollment.course_id == Course.id
        )
        .filter(
            Course.price > 0
        )
        .first()
    )


    paid_enrollment_count = paid_data[0] or 0

    paid_enrollment_amount = float(
        paid_data[1] or 0
    )


    # Free Courses

    free_enrollment_count = (
        db.query(Enrollment)
        .join(
            Course,
            Enrollment.course_id == Course.id
        )
        .filter(
            Course.price == 0
        )
        .count()
    )


    return {

        "total_users": total_users,

        "new_users_week": new_users_week,
        "new_users_month": new_users_month,
        "new_users_year": new_users_year,


        "total_courses": total_courses,

        "courses_week": courses_week,
        "courses_month": courses_month,
        "courses_year": courses_year,


        "total_enrollments": total_enrollments,


        "paid_enrollment_count": paid_enrollment_count,

        "paid_enrollment_amount": paid_enrollment_amount,


        "free_enrollment_count": free_enrollment_count
    }