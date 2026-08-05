import axiosInstance from "./axiosInstance";

export const signup = async (data: {
  full_name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};