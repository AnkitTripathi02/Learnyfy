// import axiosInstance from "./axiosInstance";

// export const getProfile = async () => {
//     const response = await axiosInstance.get("/profile/me");
//     return response.data;
// };

import axiosInstance from "./axiosInstance";

export interface UpdateProfileData {
  full_name: string;
  email: string;
}

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/profile/me");

  return response.data;
};

export const updateMyProfile = async (
  data: UpdateProfileData
) => {
  const response = await axiosInstance.put(
    "/profile/me",
    data
  );

  return response.data;
};