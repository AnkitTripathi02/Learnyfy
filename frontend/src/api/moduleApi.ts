import axiosInstance from "./axiosInstance";


export const getModules = async (
    courseId: string
) => {

    const response = await axiosInstance.get(
        `/courses/${courseId}/modules`
    );

    return response.data;

};



export const createModule = async (
    courseId: string,
    data: any
) => {

    const response = await axiosInstance.post(
        `/courses/${courseId}/modules`,
        data
    );

    return response.data;

};



export const updateModule = async (
    id: string,
    data: any
) => {

    const response = await axiosInstance.put(
        `/modules/${id}`,
        data
    );

    return response.data;

};



export const deleteModule = async (
    id: string
) => {

    const response = await axiosInstance.delete(
        `/modules/${id}`
    );

    return response.data;

};