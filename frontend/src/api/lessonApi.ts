import axiosInstance from "./axiosInstance";

export const getLessons = async (
  moduleId: string
) => {
  const response = await axiosInstance.get(
    `/modules/${moduleId}/lessons`
  );

  return response.data;
};

export const createLesson = async (
  moduleId: string,
  data: any
) => {
  const response = await axiosInstance.post(
    `/modules/${moduleId}/lessons`,
    data
  );

  return response.data;
};

export const updateLesson = async (
  lessonId: string,
  data: any
) => {
  const response = await axiosInstance.put(
    `/lessons/${lessonId}`,
    data
  );

  return response.data;
};

export const deleteLesson = async (
  lessonId: string
) => {
  const response = await axiosInstance.delete(
    `/lessons/${lessonId}`
  );

  return response.data;
};