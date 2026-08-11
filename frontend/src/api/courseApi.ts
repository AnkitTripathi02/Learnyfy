import axiosInstance from "./axiosInstance";

export const getCourses = async (
 search="",
 category="",
 price=""
)=>{


const response = await axiosInstance.get(
 "/courses",
 {
  params:{
    search,
    category,
    price
  }
 }
);


return response.data;


};

export const getCourseById = async (id: string) => {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;
};

export const createCourse = async (data: any) => {
    const response = await axiosInstance.post("/courses", data);
    return response.data;
};

export const updateCourse = async (
    id: string,
    data: any
) => {
    const response = await axiosInstance.put(
        `/courses/${id}`,
        data
    );

    return response.data;
};

export const deleteCourse = async (id: string) => {
    const response = await axiosInstance.delete(
        `/courses/${id}`
    );

    return response.data;
};

/* ===========================
   NEW FUNCTION
=========================== */

export const searchCourses = async (params: any) => {
    const response = await axiosInstance.get("/courses", {
        params,
    });

    return response.data;
};