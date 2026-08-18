from pydantic import BaseModel
from typing import List


class AnalyticsSummary(BaseModel):
    total_revenue: float
    total_payments: int
    successful_payments: int
    pending_payments: int
    failed_payments: int
    total_enrollments: int
    free_enrollments: int
    paid_enrollments: int


class MonthlyRevenue(BaseModel):
    month: str
    revenue: float


class MonthlyEnrollment(BaseModel):
    month: str
    enrollments: int


class MonthlyUsers(BaseModel):
    month: str
    users: int


class TopCourse(BaseModel):
    course_id: str
    course_title: str
    enrollments: int
    revenue: float


class AnalyticsResponse(BaseModel):
    summary: AnalyticsSummary
    monthly_revenue: List[MonthlyRevenue]
    monthly_enrollments: List[MonthlyEnrollment]
    monthly_users: List[MonthlyUsers]
    top_courses: List[TopCourse]