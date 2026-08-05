import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../api/courseApi";
import ModuleModal from "../components/course/ModuleModal";
import ModuleForm from "../components/course/ModuleForm";
import LessonForm from "../components/lesson/LessonForm";
import { enrollCourse } from "../api/enrollmentApi";

import {
    getModules,
    createModule,
    updateModule,
    deleteModule
} from "../api/moduleApi";
import {
    getLessons,
    createLesson,
    updateLesson,
    deleteLesson,
} from "../api/lessonApi";

const CourseDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdmin = user.role === "admin";

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<any[]>([]);
    const [showModuleModal, setShowModuleModal] = useState(false);
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
    const [selectedModuleId, setSelectedModuleId] = useState<string>("");
    const [lessons, setLessons] = useState<Record<string, any[]>>({});


    const loadCourse = async () => {

        try {

            if (!id) return;

            const response = await getCourseById(id);

            setCourse(response);

        } catch (error) {

            console.error("Course fetch error:", error);

        } finally {

            setLoading(false);

        }

    };

    const loadLessons = async (moduleId: string) => {
        try {
            const data = await getLessons(moduleId);

            console.log("Lessons:", data); // <-- add this

            setLessons((prev) => ({
                ...prev,
                [moduleId]: data,
            }));
        } catch (error) {
            console.error(error);
        }
    };



    const loadModules = async () => {
        try {
            if (!id) return;

            const response = await getModules(id);

            setModules(response);

            response.forEach((module: any) => {
                loadLessons(module.id);
            });

        } catch (error) {
            console.error(
                "Module fetch error",
                error
            );
        }
    };
    const handleDeleteModule = async (
        moduleId: string
    ) => {

        try {

            await deleteModule(moduleId);

            loadModules();


        } catch (error) {

            console.error(
                "Delete module error",
                error
            );

        }

    };



    useEffect(() => {

        loadCourse();
        loadModules();

    }, [id]);



    if (loading) {

        return (
            <div className="flex h-screen items-center justify-center text-white">
                Loading course...
            </div>
        );

    }



    if (!course) {

        return (
            <div className="flex h-screen items-center justify-center text-gray-400">
                Course not found
            </div>
        );

    }




    return (

        <div className="min-h-screen bg-[#0b0914] p-8 text-white">


            <button
                onClick={() => navigate("/courses")}
                className="mb-6 rounded-lg bg-gray-700 px-4 py-2 hover:bg-gray-600"
            >
                ← Back
            </button>



            <div className="rounded-2xl border border-[#2c2545] bg-[#161122] p-8">


                <div className="flex justify-between">


                    <div>

                        <h1 className="text-3xl font-bold">
                            {course.title}
                        </h1>


                        <p className="mt-3 text-gray-400">
                            {course.description}
                        </p>


                    </div>



                    <div className="flex items-center gap-3">


                        <span
                            className={`rounded-full px-4 py-2 text-sm font-medium ${course.is_published
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                }`}
                        >
                            {course.is_published ? "Published" : "Draft"}
                        </span>



{!isAdmin && (
  <button
    onClick={async () => {
      try {
        const user = localStorage.getItem("user");

        if (!user) {
          alert("User not logged in");
          return;
        }

        const userId = JSON.parse(user).id;

        await enrollCourse(course.id, userId);

        alert("Course enrolled successfully");
      } catch (error: any) {
        console.log("Enrollment Error:", error.response?.data);

        alert(
          error.response?.data?.detail ||
          "Enrollment failed"
        );
      }
    }}
    className="rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"
  >
    Enroll Now
  </button>
)}


                    </div>


                </div>




                <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">


                    <div>
                        <p className="text-gray-400">
                            Category
                        </p>

                        <p className="font-semibold">
                            {course.category}
                        </p>
                    </div>



                    <div>
                        <p className="text-gray-400">
                            Level
                        </p>

                        <p className="font-semibold">
                            {course.level}
                        </p>
                    </div>




                    <div>
                        <p className="text-gray-400">
                            Instructor
                        </p>

                        <p className="font-semibold">
                            {course.instructor}
                        </p>
                    </div>




                    <div>
                        <p className="text-gray-400">
                            Price
                        </p>

                        <p className="font-semibold text-green-400">
                            ₹{course.price}
                        </p>
                    </div>


                </div>


            </div>





            {/* Modules Section */}


            <div className="mt-8 rounded-2xl border border-[#2c2545] bg-[#161122] p-8">


                <div className="flex justify-between items-center">


                    <h2 className="text-2xl font-bold">
                        Modules
                    </h2>


{isAdmin && (
  <button
    onClick={() => {
      setSelectedModule(null);
      setShowModuleModal(true);
    }}
    className="rounded-lg bg-purple-600 px-4 py-2 hover:bg-purple-700"
  >
    + Add Module
  </button>
)}


                </div>



                <div className="mt-6 space-y-4">

                    {modules.length === 0 ? (

                        <div className="text-gray-400">
                            No modules available.
                        </div>

                    ) : (

                        modules.map((module) => (

                            <div
                                key={module.id}
                                className="rounded-xl border border-[#2c2545] bg-[#1b1528] p-5"
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h3 className="text-lg font-semibold">
                                            {module.title}
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-400">
                                            {module.description}
                                        </p>

                                        <div className="mt-5 border-t border-[#2c2545] pt-4">

                                            <div className="flex justify-between items-center">

                                                <h4 className="font-semibold">
                                                    Lessons
                                                </h4>

{isAdmin && (
  <button
    onClick={() => {
      setSelectedModuleId(module.id);
      setSelectedLesson(null);
      setShowLessonModal(true);
    }}
    className="rounded bg-green-600 px-3 py-1"
  >
    + Add Lesson
  </button>
)}

                                            </div>

                                            {lessons[module.id]?.length === 0 ? (
                                                <p className="mt-3 text-gray-400">
                                                    No lessons available.
                                                </p>
                                            ) : (
                                                <div className="mt-3 space-y-2">
                                                    {lessons[module.id]?.map((lesson: any) => (
                                                        <div
                                                            key={lesson.id}
                                                            className="flex items-center justify-between rounded-lg bg-[#241d35] p-3"
                                                        >
                                                            <div>
                                                                <p className="font-medium">{lesson.title}</p>
                                                                <p className="text-sm text-gray-400">
                                                                    {lesson.duration}
                                                                </p>
                                                            </div>
{isAdmin && (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedLesson(lesson);
                                                                        setSelectedModuleId(module.id);
                                                                        setShowLessonModal(true);
                                                                    }}
                                                                    className="rounded bg-blue-600 px-3 py-1 text-sm"
                                                                >
                                                                    Edit
                                                                </button>

                                                                <button
                                                                    onClick={async () => {
                                                                        await deleteLesson(lesson.id);
                                                                        loadLessons(module.id);
                                                                    }}
                                                                    className="rounded bg-red-600 px-3 py-1 text-sm"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
)}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>

{isAdmin && (
                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => {
                                                setSelectedModule(module);
                                                setShowModuleModal(true);
                                            }}
                                            className="rounded-lg bg-blue-600 px-3 py-1 text-sm"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteModule(module.id)
                                            }
                                            className="rounded-lg bg-red-600 px-3 py-1 text-sm"
                                        >
                                            Delete
                                        </button>

                                    </div>
)}

                                </div>

                            </div>

                        ))

                    )}

                </div>



            </div>

            <ModuleModal
                open={showModuleModal}
                onClose={() => setShowModuleModal(false)}
            >

                <ModuleForm
                    initialData={selectedModule}
                    onSuccess={async (module) => {

                        try {

                            if (selectedModule) {

                                // EDIT
                                await updateModule(
                                    selectedModule.id,
                                    module
                                );

                            } else {

                                // ADD
                                await createModule(
                                    id!,
                                    module
                                );

                            }

                            loadModules();

                            setSelectedModule(null);

                            setShowModuleModal(false);

                        } catch (error) {

                            console.error(error);

                        }

                    }}
                />

            </ModuleModal>

            <ModuleModal
                open={showLessonModal}
                onClose={() => {
                    setShowLessonModal(false);
                    setSelectedLesson(null);
                }}
            >
                <LessonForm
                    initialData={selectedLesson}
                    onSuccess={async (lesson) => {
                        try {
                            if (selectedLesson) {
                                await updateLesson(
                                    selectedLesson.id,
                                    lesson
                                );
                            } else {
                                await createLesson(
                                    selectedModuleId,
                                    lesson
                                );
                            }

                            await loadLessons(selectedModuleId);

                            setSelectedLesson(null);
                            setShowLessonModal(false);

                        } catch (error) {
                            console.error("Lesson Error:", error);
                        }
                    }}
                />
            </ModuleModal>


        </div>

    );

};


export default CourseDetails;