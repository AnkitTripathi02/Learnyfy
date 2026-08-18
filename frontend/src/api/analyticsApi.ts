import axiosInstance from "./axiosInstance";

export const getAnalytics = async () => {
    const response = await axiosInstance.get("/admin/analytics");

    return response.data;
};