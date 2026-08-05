import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
    const response = await axiosInstance.get("/profile/me");
    return response.data;
};