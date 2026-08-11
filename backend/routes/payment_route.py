from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from uuid import UUID

from database import get_db

from services.payment_service import (
    create_razorpay_order,
    verify_razorpay_payment,
)

from models.course_model import Course


router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


class CreateOrderRequest(BaseModel):
    course_id: UUID
    user_id: UUID


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    course_id: UUID
    user_id: UUID


@router.post("/create-order")
def create_order(
    data: CreateOrderRequest,
    db: Session = Depends(get_db),
):

    course = (
        db.query(Course)
        .filter(Course.id == data.course_id)
        .first()
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    if course.price is None or float(course.price) <= 0:
        raise HTTPException(
            status_code=400,
            detail="This course is free",
        )

    try:

        order = create_razorpay_order(
            amount=float(course.price),
            receipt=f"course_{course.id}",
        )

        return {
            "key_id": "dummy_key",
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
        }

    except Exception as error:

        print("Dummy payment create order error:", error)

        raise HTTPException(
            status_code=500,
            detail="Unable to create payment order",
        )


@router.post("/verify")
def verify_payment(
    data: VerifyPaymentRequest,
    db: Session = Depends(get_db),
):

    try:

        verify_razorpay_payment(
            razorpay_order_id=data.razorpay_order_id,
            razorpay_payment_id=data.razorpay_payment_id,
            razorpay_signature=data.razorpay_signature,
        )

        return {
            "success": True,
            "message": "Payment verified successfully",
            "course_id": str(data.course_id),
            "user_id": data.user_id,
        }

    except Exception as error:

        print("Dummy payment verification error:", error)

        raise HTTPException(
            status_code=400,
            detail="Payment verification failed",
        )