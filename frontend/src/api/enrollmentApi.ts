import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";


// ============================================================
// ENROLL COURSE
// ============================================================

export const enrollCourse = (
    course_id: string,
    user_id: string
) => {
    return axios.post(
        `${BASE_URL}/courses/${course_id}/enroll`,
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
    return axios.get(
        `${BASE_URL}/my-courses/${user_id}`
    );
};