import axiosInstance from "./axiosInstance";

export const getCertificate = async (
  courseId: string,
  userId: string
) => {

  console.log("Course:", courseId);
  console.log("User:", userId);

  const response = await axiosInstance.get(
    `/certificate/${courseId}/${userId}`
  );

  console.log(response.data);

  return response.data;
};