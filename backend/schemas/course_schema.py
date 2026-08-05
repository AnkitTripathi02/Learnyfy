from pydantic import BaseModel, ConfigDict
from decimal import Decimal
from uuid import UUID
from typing import Optional


class CourseCreate(BaseModel):
    title: str
    slug: str
    short_description: str
    description: str
    thumbnail: Optional[str] = None
    category: str
    level: str
    language: str = "English"
    duration: str
    price: Decimal = Decimal("0.00")
    instructor: str
    is_published: bool = False


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    thumbnail: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
    language: Optional[str] = None
    duration: Optional[str] = None
    price: Optional[Decimal] = None
    instructor: Optional[str] = None
    is_published: Optional[bool] = None


class CourseResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    short_description: str
    description: str
    thumbnail: Optional[str]
    category: str
    level: str
    language: str
    duration: str
    price: Decimal
    instructor: str
    is_published: bool

    model_config = ConfigDict(from_attributes=True)