import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../api/courseApi";
import ModuleModal from "../components/course/ModuleModal";
import ModuleForm from "../components/course/ModuleForm";
import LessonForm from "../components/lesson/LessonForm";
import { enrollCourse } from "../api/enrollmentApi";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Swal from "sweetalert2";
import { createPaymentOrder, verifyPayment } from "../api/paymentApi";
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

    const loadRazorpay = () => {
        return new Promise<boolean>((resolve) => {

            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");

            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => resolve(true);

            script.onerror = () => resolve(false);

            document.body.appendChild(script);
        });
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
        <>
            <Navbar />

            <div className="min-h-screen bg-[#0b0914] pt-24 p-8 text-white">


                <button
                    onClick={() => navigate("/courses")}
                    className="
    mb-6
    flex
    items-center
    gap-2
    rounded-xl
    border
    border-[#2c2545]
    bg-[#161122]
    px-5
    py-3
    text-gray-300
    transition
    hover:bg-[#241d35]
    hover:text-white
    "
                >
                    ← Back to Courses
                </button>


                <div className="overflow-hidden rounded-3xl border border-[#2c2545] bg-gradient-to-br from-[#161122] to-[#0f0b1d] shadow-2xl">

                    <div className="grid gap-8 p-8 lg:grid-cols-2">


                        {/* Course Image */}

                        <div className="group relative overflow-hidden rounded-2xl">

                            <img
                                src={
                                    course.thumbnail && course.thumbnail !== ""
                                        ? course.thumbnail
                                        : "https://placehold.co/600x400?text=LearnyFy"
                                }
                                alt={course.title}
                                className="
h-[350px]
w-full
rounded-2xl
object-cover
shadow-xl
transition
duration-500
hover:scale-105
"
                            />


                            <span className="
                absolute
                left-5
                top-5
                rounded-full
                bg-indigo-600
                px-4
                py-2
                text-sm
                font-semibold
                text-white
            ">
                                {course.category}
                            </span>


                            <span className="
                absolute
                right-5
                top-5
                rounded-full
                bg-green-500
                px-4
                py-2
                text-sm
                font-semibold
                text-white
            ">
                                {Number(course.price) === 0
                                    ? "FREE"
                                    : `₹${course.price}`}
                            </span>


                        </div>




                        {/* Course Info */}

                        <div className="flex flex-col justify-center">


                            <h1 className="
                text-4xl
                font-extrabold
                leading-tight
            ">
                                {course.title}
                            </h1>



                            <div className="mt-4 flex items-center gap-2 text-yellow-400">

                                ⭐⭐⭐⭐⭐

                                <span className="text-gray-300">
                                    4.8 (120 Reviews)
                                </span>

                            </div>



                            <p className="
                mt-5
                text-gray-400
                leading-relaxed
            ">
                                {course.description}
                            </p>




                            <div className="
                mt-6
                grid
                grid-cols-2
                gap-4
            ">


                                <div className="rounded-xl bg-[#241d35] p-4">

                                    <p className="text-sm text-gray-400">
                                        Instructor
                                    </p>

                                    <p className="font-semibold">
                                        {course.instructor}
                                    </p>

                                </div>



                                <div className="rounded-xl bg-[#241d35] p-4">

                                    <p className="text-sm text-gray-400">
                                        Duration
                                    </p>

                                    <p className="font-semibold">
                                        {course.duration}
                                    </p>

                                </div>


                            </div>





                            {!isAdmin && (

                                <button
                                    onClick={async () => {
                                        try {
                                            const userData = localStorage.getItem("user");

                                            if (!userData) {
                                                const result = await Swal.fire({
                                                    icon: "info",
                                                    title: "Login Required",
                                                    text: "Please login first to enroll in this course.",
                                                    background: "#161122",
                                                    color: "#ffffff",
                                                    confirmButtonText: "Login Now",
                                                    cancelButtonText: "Maybe Later",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#6366f1",
                                                    cancelButtonColor: "#374151",
                                                });

                                                if (result.isConfirmed) {
                                                    navigate("/login");
                                                }

                                                return;
                                            }

                                            const loggedInUser = JSON.parse(userData);

                                            if (!loggedInUser?.id) {
                                                navigate("/login");
                                                return;
                                            }

                                            // =========================
                                            // FREE COURSE
                                            // =========================

                                            if (Number(course.price) === 0) {

                                                Swal.fire({
                                                    title: "Enrolling...",
                                                    text: "Please wait...",
                                                    background: "#161122",
                                                    color: "#ffffff",
                                                    allowOutsideClick: false,
                                                    showConfirmButton: false,
                                                    didOpen: () => {
                                                        Swal.showLoading();
                                                    },
                                                });

                                                await enrollCourse(
                                                    course.id,
                                                    loggedInUser.id
                                                );

                                                await Swal.fire({
                                                    icon: "success",
                                                    title: "You're Enrolled! 🎉",
                                                    text: `You have successfully enrolled in ${course.title}.`,
                                                    background: "#161122",
                                                    color: "#ffffff",
                                                    confirmButtonText: "Start Learning",
                                                    confirmButtonColor: "#6366f1",
                                                });

                                                navigate(`/learn/${course.id}`);

                                                return;
                                            }

                                            // =========================
                                            // PAID COURSE
                                            // =========================

                                            const razorpayLoaded = await loadRazorpay();

                                            if (!razorpayLoaded) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Payment Error",
                                                    text: "Unable to load payment gateway.",
                                                    background: "#161122",
                                                    color: "#ffffff",
                                                });

                                                return;
                                            }

                                            Swal.fire({
                                                title: "Preparing Payment...",
                                                text: "Please wait...",
                                                background: "#161122",
                                                color: "#ffffff",
                                                allowOutsideClick: false,
                                                showConfirmButton: false,
                                                didOpen: () => {
                                                    Swal.showLoading();
                                                },
                                            });

                                            // Create Razorpay order
                                            const order = await createPaymentOrder(
                                                course.id,
                                                loggedInUser.id
                                            );

                                            Swal.close();

                                            const options = {
                                                key: order.key_id,

                                                amount: order.amount,

                                                currency: order.currency || "INR",

                                                name: "LearnyFy",

                                                description: course.title,

                                                order_id: order.order_id,

                                                handler: async function (response: any) {

                                                    try {

                                                        Swal.fire({
                                                            title: "Verifying Payment...",
                                                            text: "Please wait...",
                                                            background: "#161122",
                                                            color: "#ffffff",
                                                            allowOutsideClick: false,
                                                            showConfirmButton: false,
                                                            didOpen: () => {
                                                                Swal.showLoading();
                                                            },
                                                        });

                                                        await verifyPayment({
                                                            razorpay_order_id: response.razorpay_order_id,
                                                            razorpay_payment_id: response.razorpay_payment_id,
                                                            razorpay_signature: response.razorpay_signature,
                                                            course_id: course.id,
                                                            user_id: loggedInUser.id,
                                                        });

                                                        await Swal.fire({
                                                            icon: "success",
                                                            title: "Payment Successful! 🎉",
                                                            text: `You are now enrolled in ${course.title}.`,
                                                            background: "#161122",
                                                            color: "#ffffff",
                                                            confirmButtonText: "Start Learning",
                                                            confirmButtonColor: "#6366f1",
                                                        });

                                                        navigate(`/learn/${course.id}`);

                                                    } catch (error: any) {

                                                        console.error(
                                                            "Payment verification error:",
                                                            error
                                                        );

                                                        Swal.fire({
                                                            icon: "error",
                                                            title: "Payment Verification Failed",
                                                            text:
                                                                error?.response?.data?.detail ||
                                                                "Payment could not be verified.",
                                                            background: "#161122",
                                                            color: "#ffffff",
                                                            confirmButtonColor: "#6366f1",
                                                        });
                                                    }
                                                },

                                                prefill: {
                                                    name:
                                                        loggedInUser.name ||
                                                        loggedInUser.username ||
                                                        "",

                                                    email:
                                                        loggedInUser.email ||
                                                        "",
                                                },

                                                theme: {
                                                    color: "#6366f1",
                                                },

                                                modal: {
                                                    ondismiss: function () {
                                                        console.log("Payment cancelled");
                                                    },
                                                },
                                            };

                                            const razorpay = new (window as any).Razorpay(options);

                                            razorpay.open();

                                        } catch (error: any) {

                                            console.error(
                                                "Enrollment/Payment Error:",
                                                error
                                            );

                                            Swal.fire({
                                                icon: "error",
                                                title: "Something went wrong",
                                                text:
                                                    error?.response?.data?.detail ||
                                                    "Unable to process your request.",
                                                background: "#161122",
                                                color: "#ffffff",
                                                confirmButtonColor: "#6366f1",
                                            });
                                        }
                                    }}

                                    className="
                    mt-8
                    rounded-xl
                    bg-gradient-to-r
                    from-indigo-600
                    to-purple-600
                    py-4
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    hover:scale-105
                    "
                                >

                                    Enroll Now 🚀

                                </button>

                            )}



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
                                                                    <p className="mt-2 text-lg text-gray-300">
                                                                        {course.short_description}
                                                                    </p>
                                                                    <p className="mt-5 text-gray-400">
                                                                        {course.description}
                                                                    </p>
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

            <Footer />

        </>

    );

};


export default CourseDetails;