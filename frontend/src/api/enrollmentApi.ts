import axiosInstance from "./axiosInstance";


// ============================================================
// ENROLL COURSE
// ============================================================

export const enrollCourse = (
    course_id: string,
    user_id: string
) => {
    return axiosInstance.post(
        `/courses/${course_id}/enroll`,
        {
            user_id,
        }
    );
};


// ============================================================
// GET MY COURSES
// ============================================================

export const getMyCourses = (
    user_id: string
) => {
    return axiosInstance.get(
        `/my-courses/${user_id}`
    );
};