from pydantic import BaseModel


class CreateOrderRequest(BaseModel):
    course_id: str
    user_id: int


class CreateOrderResponse(BaseModel):
    key_id: str
    order_id: str
    amount: int
    currency: str


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

    course_id: str
    user_id: int


class VerifyPaymentResponse(BaseModel):
    success: bool
    message: str