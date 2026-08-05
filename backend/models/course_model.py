from sqlalchemy import Column, String, Text, Boolean, DateTime, Numeric
from sqlalchemy.dialects.postgresql import UUID
from database import Base
import uuid
from datetime import datetime


class Course(Base):
    __tablename__ = "courses"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    title = Column(
        String(200),
        nullable=False,
    )

    slug = Column(
        String(250),
        unique=True,
        nullable=False,
    )

    short_description = Column(
        String(300),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    thumbnail = Column(
        String(500),
        nullable=True,
    )

    category = Column(
        String(100),
        nullable=False,
    )

    level = Column(
        String(50),
        nullable=False,
    )

    language = Column(
        String(50),
        default="English",
    )

    duration = Column(
        String(50),
        nullable=False,
    )

    price = Column(
        Numeric(10,2),
        default=0,
    )

    instructor = Column(
        String(150),
        nullable=False,
    )

    is_published = Column(
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