from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from uuid import UUID

from database import get_db
from config import RAZORPAY_KEY_ID

from services.payment_service import (
    create_razorpay_order,
    verify_razorpay_payment,
)

from models.course_model import Course
from models.payment_model import Payment
from models.enrollment_model import Enrollment
from models.user_model import User

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

        payment = Payment(
            user_id=data.user_id,
            course_id=course.id,
            razorpay_order_id=order["id"],
            amount=float(course.price),
            currency=order["currency"],
            status="created",
        )

        db.add(payment)
        db.commit()

        return {
            "key_id": RAZORPAY_KEY_ID,
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
        }

    except Exception as error:

        print("Create order error:", error)

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

        payment = (
            db.query(Payment)
            .filter(
                Payment.razorpay_order_id == data.razorpay_order_id
            )
            .first()
        )

        if not payment:
            raise HTTPException(
                status_code=404,
                detail="Payment not found",
            )

        payment.razorpay_payment_id = data.razorpay_payment_id
        payment.razorpay_signature = data.razorpay_signature
        payment.status = "paid"

        already = (
            db.query(Enrollment)
            .filter(
                Enrollment.user_id == data.user_id,
                Enrollment.course_id == data.course_id,
            )
            .first()
        )

        if not already:

            enrollment = Enrollment(
                user_id=data.user_id,
                course_id=data.course_id,
            )

            db.add(enrollment)

        db.commit()

        return {
            "success": True,
            "message": "Payment verified successfully",
        }

    except Exception as error:

        print("Payment verification error:", error)

        raise HTTPException(
            status_code=400,
            detail=str(error),
        )



@router.get("/admin")
def get_admin_payments(
    db: Session = Depends(get_db),
):
    try:
        payments = (
            db.query(
                Payment.id,
                Payment.user_id,
                User.full_name.label("user_name"),
                User.email.label("user_email"),
                Payment.course_id,
                Course.title.label("course_title"),
                Payment.razorpay_order_id,
                Payment.razorpay_payment_id,
                Payment.amount,
                Payment.currency,
                Payment.status,
                Payment.created_at,
            )
            .join(
                User,
                Payment.user_id == User.id
            )
            .join(
                Course,
                Payment.course_id == Course.id
            )
            .order_by(
                Payment.created_at.desc()
            )
            .all()
        )

        return [
            {
                "id": payment.id,
                "user_id": str(payment.user_id),
                "user_name": payment.user_name,
                "user_email": payment.user_email,
                "course_id": str(payment.course_id),
                "course_title": payment.course_title,
                "razorpay_order_id": payment.razorpay_order_id,
                "razorpay_payment_id": payment.razorpay_payment_id,
                "amount": float(payment.amount),
                "currency": payment.currency,
                "status": payment.status,
                "created_at": payment.created_at,
            }
            for payment in payments
        ]

    except Exception as error:
        print("Admin payments error:", error)

        raise HTTPException(
            status_code=500,
            detail="Unable to fetch payments",
        )