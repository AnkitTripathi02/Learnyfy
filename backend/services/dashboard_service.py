from sqlalchemy.orm import Session


def get_dashboard_stats(
    db: Session,
    current_user,
):
    return {
        "total_courses": 12,
        "completed_courses": 8,
        "practice_count": 145,
        "rank": 24,
    }