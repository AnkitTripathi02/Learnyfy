import razorpay
from config import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)


def create_razorpay_order(
    amount: float,
    receipt: str,
):
    amount_in_paise = int(amount * 100)

    order = client.order.create({
        "amount": amount_in_paise,
        "currency": "INR",
        "receipt": receipt,
        "payment_capture": 1
    })

    return order


def verify_razorpay_payment(
    razorpay_order_id: str,
    razorpay_payment_id: str,
    razorpay_signature: str,
):
    client.utility.verify_payment_signature({
        "razorpay_order_id": razorpay_order_id,
        "razorpay_payment_id": razorpay_payment_id,
        "razorpay_signature": razorpay_signature,
    })

    return True