import axiosInstance from "./axiosInstance";

export const createPaymentOrder = async (
    courseId: string,
    userId: number
) => {
    const response = await axiosInstance.post("/payments/create-order", {
        course_id: courseId,
        user_id: userId,
    });

    return response.data;
};

export const verifyPayment = async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    course_id: string;
    user_id: number;
}) => {
    const response = await axiosInstance.post(
        "/payments/verify",
        data
    );

    return response.data;
};