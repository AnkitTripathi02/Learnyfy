import uuid


def create_razorpay_order(
    amount: float,
    receipt: str
):
    amount_in_paise = int(round(amount * 100))

    order_id = f"order_dummy_{uuid.uuid4().hex[:12]}"

    return {
        "id": order_id,
        "amount": amount_in_paise,
        "currency": "INR",
        "receipt": receipt,
        "status": "created",
    }


def verify_razorpay_payment(
    razorpay_order_id: str,
    razorpay_payment_id: str,
    razorpay_signature: str,
):
    # Dummy payment verification
    # Real Razorpay verification future mein add karenge.

    if not razorpay_order_id:
        raise ValueError("Order ID is required")

    if not razorpay_payment_id:
        raise ValueError("Payment ID is required")

    if not razorpay_signature:
        raise ValueError("Payment signature is required")

    return True