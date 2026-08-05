from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime


class EnrollmentCreate(BaseModel):
    user_id: UUID


class EnrollmentResponse(BaseModel):

    id: int
    user_id: UUID
    course_id: UUID
    isactive: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MyCourseResponse(BaseModel):

    id: int
    course_id: UUID
    title: str
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    progress: int = 0
    is_completed: bool = False
    enrolled_at: datetime

    class Config:
        from_attributes = True