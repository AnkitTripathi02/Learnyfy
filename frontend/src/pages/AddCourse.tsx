import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CourseForm from "../components/course/CourseForm";

const AddCourse = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#090817] p-8">

            <div className="mx-auto max-w-7xl">

                <button
                    onClick={() => navigate("/courses")}
                    className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white"
                >
                    <FaArrowLeft />
                    Back to Courses
                </button>

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Create New Course
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Fill the details below to create a new course.
                    </p>

                </div>

                <div className="rounded-3xl border border-[#2b2344] bg-[#151122] p-8">

                    <CourseForm />

                </div>

            </div>

        </div>
    );
};

export default AddCourse;