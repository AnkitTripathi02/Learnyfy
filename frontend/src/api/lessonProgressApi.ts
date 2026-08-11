import axiosInstance from "./axiosInstance";

export const completeLesson = async (
  courseId: string,
  lessonId: string,
  userId: string
) => {
  const response = await axiosInstance.post(
    `/courses/${courseId}/lessons/${lessonId}/complete`,
    {
      user_id: userId,
    }
  );

  return response.data;
};

export const getCourseProgress = async (
  courseId: string,
  userId: string
) => {
  const response = await axiosInstance.get(
    `/courses/${courseId}/progress/${userId}`
  );

  return response.data;
};