from pydantic import BaseModel, ConfigDict
from uuid import UUID
from typing import Optional
from datetime import datetime


class LessonCreate(BaseModel):

    title: str
    description: Optional[str] = None
    video_url: str
    duration: Optional[str] = None
    order: int = 0
    is_preview: bool = False


class LessonUpdate(BaseModel):

    title: Optional[str] = None
    description: Optional[str] = None
    video_url: Optional[str] = None
    duration: Optional[str] = None
    order: Optional[int] = None
    is_preview: Optional[bool] = None


class LessonResponse(BaseModel):

    id: UUID
    module_id: UUID

    title: str
    description: Optional[str]

    video_url: str
    duration: Optional[str]

    order: int

    is_preview: bool

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )