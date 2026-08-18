from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from models.user_model import User
from models.course_model import Course
from models.enrollment_model import Enrollment
from models.payment_model import Payment


def get_analytics_stats(db: Session):

    now = datetime.utcnow()

    # =========================================================
    # SUMMARY
    # =========================================================

    total_users = db.query(User).count()

    total_enrollments = (
        db.query(Enrollment)
        .count()
    )

    total_payments = (
        db.query(Payment)
        .count()
    )

    successful_payments = (
        db.query(Payment)
        .filter(
            Payment.status == "paid"
        )
        .count()
    )

    pending_payments = (
        db.query(Payment)
        .filter(
            Payment.status == "created"
        )
        .count()
    )

    failed_payments = (
        db.query(Payment)
        .filter(
            Payment.status == "failed"
        )
        .count()
    )

    # REAL REVENUE
    total_revenue = (
        db.query(
            func.sum(Payment.amount)
        )
        .filter(
            Payment.status == "paid"
        )
        .scalar()
    )

    total_revenue = float(
        total_revenue or 0
    )

    # =========================================================
    # FREE / PAID ENROLLMENTS
    # =========================================================

    paid_enrollments = (
        db.query(Enrollment)
        .join(
            Course,
            Enrollment.course_id == Course.id
        )
        .filter(
            Course.price > 0
        )
        .count()
    )

    free_enrollments = (
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

    # =========================================================
    # MONTHLY REVENUE - LAST 12 MONTHS
    # =========================================================

    twelve_months_ago = now - timedelta(days=365)

    revenue_data = (
        db.query(
            func.date_trunc(
                "month",
                Payment.created_at
            ).label("month"),

            func.sum(
                Payment.amount
            ).label("revenue")
        )
        .filter(
            Payment.status == "paid",
            Payment.created_at >= twelve_months_ago
        )
        .group_by(
            func.date_trunc(
                "month",
                Payment.created_at
            )
        )
        .order_by(
            func.date_trunc(
                "month",
                Payment.created_at
            )
        )
        .all()
    )

    monthly_revenue = []

    for row in revenue_data:

        monthly_revenue.append({
            "month": row.month.strftime("%b %Y"),
            "revenue": float(
                row.revenue or 0
            )
        })

    # =========================================================
    # MONTHLY ENROLLMENTS - LAST 12 MONTHS
    # =========================================================

    enrollment_data = (
        db.query(
            func.date_trunc(
                "month",
                Enrollment.created_at
            ).label("month"),

            func.count(
                Enrollment.id
            ).label("enrollments")
        )
        .filter(
            Enrollment.created_at >= twelve_months_ago
        )
        .group_by(
            func.date_trunc(
                "month",
                Enrollment.created_at
            )
        )
        .order_by(
            func.date_trunc(
                "month",
                Enrollment.created_at
            )
        )
        .all()
    )

    monthly_enrollments = []

    for row in enrollment_data:

        monthly_enrollments.append({
            "month": row.month.strftime("%b %Y"),
            "enrollments": int(
                row.enrollments
            )
        })

    # =========================================================
    # MONTHLY USERS - LAST 12 MONTHS
    # =========================================================

    user_data = (
        db.query(
            func.date_trunc(
                "month",
                User.created_at
            ).label("month"),

            func.count(
                User.id
            ).label("users")
        )
        .filter(
            User.created_at >= twelve_months_ago
        )
        .group_by(
            func.date_trunc(
                "month",
                User.created_at
            )
        )
        .order_by(
            func.date_trunc(
                "month",
                User.created_at
            )
        )
        .all()
    )

    monthly_users = []

    for row in user_data:

        monthly_users.append({
            "month": row.month.strftime("%b %Y"),
            "users": int(
                row.users
            )
        })

    # =========================================================
    # TOP COURSES
    # =========================================================

    top_course_data = (
        db.query(
            Course.id,
            Course.title,

            func.count(
                Enrollment.id
            ).label("enrollments"),

            func.coalesce(
                func.sum(
                    Payment.amount
                ),
                0
            ).label("revenue")
        )
        .outerjoin(
            Enrollment,
            Enrollment.course_id == Course.id
        )
        .outerjoin(
            Payment,
            (
                Payment.course_id == Course.id
            )
            &
            (
                Payment.status == "paid"
            )
        )
        .group_by(
            Course.id,
            Course.title
        )
        .order_by(
            func.count(
                Enrollment.id
            ).desc()
        )
        .limit(10)
        .all()
    )

    top_courses = []

    for row in top_course_data:

        top_courses.append({
            "course_id": str(row.id),
            "course_title": row.title,
            "enrollments": int(
                row.enrollments or 0
            ),
            "revenue": float(
                row.revenue or 0
            )
        })

    # =========================================================
    # FINAL RESPONSE
    # =========================================================

    return {

        "summary": {

            "total_revenue":
                total_revenue,

            "total_payments":
                total_payments,

            "successful_payments":
                successful_payments,

            "pending_payments":
                pending_payments,

            "failed_payments":
                failed_payments,

            "total_enrollments":
                total_enrollments,

            "free_enrollments":
                free_enrollments,

            "paid_enrollments":
                paid_enrollments,
        },

        "monthly_revenue":
            monthly_revenue,

        "monthly_enrollments":
            monthly_enrollments,

        "monthly_users":
            monthly_users,

        "top_courses":
            top_courses,
    }