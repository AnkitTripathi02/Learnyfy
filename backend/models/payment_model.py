from sqlalchemy import Column, Integer, String, Numeric, DateTime
from sqlalchemy.sql import func

from database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)
    course_id = Column(String, nullable=False)

    razorpay_order_id = Column(String, unique=True, nullable=False)
    razorpay_payment_id = Column(String, unique=True, nullable=True)
    razorpay_signature = Column(String, nullable=True)

    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String, default="INR")

    status = Column(String, default="created")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now()
    )