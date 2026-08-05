from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from database import Base
import uuid
from datetime import datetime


class Module(Base):

    __tablename__ = "modules"


    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )


    course_id = Column(
        UUID(as_uuid=True),
        ForeignKey("courses.id"),
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


    order = Column(
        Integer,
        default=0,
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