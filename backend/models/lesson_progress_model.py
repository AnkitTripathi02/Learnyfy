from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    DateTime,
    ForeignKey,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from database import Base
from datetime import datetime


class LessonProgress(Base):

    __tablename__ = "lesson_progress"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("mst_users.id"),
        nullable=False,
    )

    course_id = Column(
        UUID(as_uuid=True),
        ForeignKey("courses.id"),
        nullable=False,
    )

    lesson_id = Column(
        UUID(as_uuid=True),
        ForeignKey("lessons.id"),
        nullable=False,
    )

    is_completed = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    completed_at = Column(
        DateTime,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "lesson_id",
            name="uq_user_lesson_progress",
        ),
    )