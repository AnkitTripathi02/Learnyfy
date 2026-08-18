import axiosInstance from "./axiosInstance";

export const getAllStudents = async () => {
  const response = await axiosInstance.get(
    "/users/students"
  );

  return response.data;
};

export const deleteStudent = async (
  id: string
) => {
  const response = await axiosInstance.delete(
    `/users/students/${id}`
  );

  return response.data;
};

export const changeStudentStatus = async (
  id: string
) => {
  const response = await axiosInstance.patch(
    `/users/students/${id}/status`
  );

  return response.data;
};