from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime


class LessonProgressCreate(BaseModel):
    user_id: UUID


class LessonProgressResponse(BaseModel):
    id: int
    user_id: UUID
    course_id: UUID
    lesson_id: UUID
    is_completed: bool
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


class CompletedLesson(BaseModel):
    lesson_id: UUID

    class Config:
        from_attributes = True


class CourseProgressResponse(BaseModel):
    course_id: UUID
    total_lessons: int
    completed_lessons: int
    completed_lesson_list: list[CompletedLesson]
    progress_percentage: int
    is_completed: bool