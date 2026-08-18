import axiosInstance from "./axiosInstance";

export interface UpdatePasswordData {
  current_password: string;
  new_password: string;
}

export const updatePassword = async (
  data: UpdatePasswordData
) => {
  const response = await axiosInstance.put(
    "/profile/password",
    data
  );

  return response.data;
};