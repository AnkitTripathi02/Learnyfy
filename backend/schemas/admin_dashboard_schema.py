from pydantic import BaseModel


class DashboardResponse(BaseModel):

    total_users: int

    new_users_week: int
    new_users_month: int
    new_users_year: int

    total_courses: int

    courses_week: int
    courses_month: int
    courses_year: int

    total_enrollments: int

    paid_enrollment_count: int
    paid_enrollment_amount: float

    free_enrollment_count: int