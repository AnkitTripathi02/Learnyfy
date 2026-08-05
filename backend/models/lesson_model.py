from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    Boolean,
    DateTime,
    ForeignKey,
)
from sqlalchemy.dialects.postgresql import UUID
from database import Base
import uuid
from datetime import datetime


class Lesson(Base):

    __tablename__ = "lessons"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    module_id = Column(
        UUID(as_uuid=True),
        ForeignKey("modules.id"),
        nullable=False,
    )

    title = Column(
        String(200),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    video_url = Column(
        Text,
        nullable=False,
    )

    duration = Column(
        String(50),
        nullable=True,
    )

    order = Column(
        Integer,
        default=0,
    )

    is_preview = Column(
        Boolean,
        default=False,
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