import { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "../../../api/courseApi";
import { useNavigate } from "react-router-dom";
import CourseTable from "../../../components/course/CourseTable";
import CourseModal from "../../../components/course/CourseModal";
import CourseForm from "../../../components/course/CourseForm";
import { useSearch } from "../../../context/SearchContext";
import {
    FaBook,
    FaCheckCircle,
    FaClock,
    FaRupeeSign,
    FaArrowLeft,
} from "react-icons/fa";

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

    const publishedCourses = courses.filter(
        (course) => course.is_published
    ).length;

    const draftCourses = courses.length - publishedCourses;

    const totalRevenue = courses.reduce(
        (sum, course) => sum + Number(course.price || 0),
        0
    );
    const { search } = useSearch();

    return (
        <div>

            {/* <div className="flex items-center justify-between">

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

            </div> */}

            <div className="mb-0.5">

                {/* Breadcrumb */}

                {/* <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="mb-6 flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition"
                >
                    <FaArrowLeft />
                    Back to Dashboard
                </button> */}

                {/* Header */}

                {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            📚 Course Management
                        </h1>

                        <p className="mt-3 text-gray-400">
                            Manage, organize and publish your learning content.
                        </p>

                    </div>

                    <button
                        onClick={() => {
                            setSelectedCourse(null);
                            setOpenModal(true);
                        }}
                        className="mt-6 md:mt-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
                    >
                        + Create Course
                    </button>

                </div> */}

            </div>

            {/* Dashboard Stats */}

            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-purple-500/20 bg-[#161122] p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Courses</p>
                            <h2 className="mt-2 text-3xl font-bold text-white">
                                {courses.length}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-purple-500/20 p-4">
                            <FaBook className="text-3xl text-purple-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-green-500/20 bg-[#161122] p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Published</p>
                            <h2 className="mt-2 text-3xl font-bold text-green-400">
                                {publishedCourses}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-green-500/20 p-4">
                            <FaCheckCircle className="text-3xl text-green-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-yellow-500/20 bg-[#161122] p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Draft</p>
                            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                                {draftCourses}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-yellow-500/20 p-4">
                            <FaClock className="text-3xl text-yellow-400" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-blue-500/20 bg-[#161122] p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Revenue</p>
                            <h2 className="mt-2 text-3xl font-bold text-blue-400">
                                ₹{totalRevenue}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-blue-500/20 p-4">
                            <FaRupeeSign className="text-3xl text-blue-400" />
                        </div>
                    </div>
                </div>

            </div>

            <CourseTable
                courses={courses.filter((course) =>
                    course.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||

                    course.category
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||

                    course.instructor
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )}
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