import { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "../../../api/courseApi";
import { useNavigate } from "react-router-dom";
import CourseTable from "../../../components/course/CourseTable";
import CourseModal from "../../../components/course/CourseModal";
import CourseForm from "../../../components/course/CourseForm";

const CourseManagement = () => {
    const navigate = useNavigate();

    const [courses, setCourses] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const loadCourses = async () => {
        try {
            const response = await getCourses();
            setCourses(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <div>

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        Course Management
                    </h1>

                    <div className="mb-6 flex items-center justify-between">

                        <button
                            onClick={() => navigate("/admin/dashboard")}
                            className="flex items-center gap-2 rounded-xl border border-purple-500 bg-[#1d1730] px-5 py-2 text-purple-300 transition hover:bg-purple-600 hover:text-white"
                        >
                            ← Admin Dashboard
                        </button>

                    </div>

                    <p className="mt-2 text-gray-400">
                        Create, update and manage all your courses.
                    </p>

                </div>

            </div>

            <CourseTable
                courses={courses}
                onAddCourse={() => {
                    setSelectedCourse(null);
                    setOpenModal(true);
                }}
                onEdit={(course) => {
                    setSelectedCourse(course);
                    setOpenModal(true);
                }}
                onDelete={async (id) => {

                    const ok = window.confirm(
                        "Delete this course?"
                    );

                    if (!ok) return;

                    try {

                        await deleteCourse(id);

                        loadCourses();

                        alert("Course Deleted Successfully");

                    } catch (error) {

                        console.error(error);

                        alert("Delete Failed");

                    }

                }}
            />

            <CourseModal
                open={openModal}
                onClose={() => {

                    setOpenModal(false);
                    setSelectedCourse(null);

                }}
            >
                <CourseForm
                    initialData={selectedCourse}
                    onSuccess={() => {

                        setOpenModal(false);
                        setSelectedCourse(null);
                        loadCourses();

                    }}
                />
            </CourseModal>

        </div>
    );
};

export default CourseManagement;