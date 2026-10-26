import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    deleteModule,
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

    const [selectedModuleId, setSelectedModuleId] =
        useState<string>("");

    const [lessons, setLessons] = useState<Record<string, any[]>>({});

    // =========================================================
    // ACCORDION STATE
    // =========================================================
    const [expandedModuleId, setExpandedModuleId] =
        useState<string | null>(null);

    // =========================================================
    // TOGGLE MODULE
    // =========================================================
    const toggleModule = (moduleId: string) => {
        setExpandedModuleId((prev) =>
            prev === moduleId ? null : moduleId
        );
    };

    // =========================================================
    // LOAD COURSE
    // =========================================================
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

    // =========================================================
    // LOAD LESSONS
    // =========================================================
    const loadLessons = async (moduleId: string) => {
        try {
            const data = await getLessons(moduleId);

            console.log("Lessons:", data);

            setLessons((prev) => ({
                ...prev,
                [moduleId]: data,
            }));
        } catch (error) {
            console.error("Lesson fetch error:", error);
        }
    };

    // =========================================================
    // LOAD MODULES
    // =========================================================
    const loadModules = async () => {
        try {
            if (!id) return;

            const response = await getModules(id);

            setModules(response);

            response.forEach((module: any) => {
                loadLessons(module.id);
            });
        } catch (error) {
            console.error("Module fetch error:", error);
        }
    };

    // =========================================================
    // LOAD RAZORPAY
    // =========================================================
    const loadRazorpay = () => {
        return new Promise<boolean>((resolve) => {
            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => resolve(true);

            script.onerror = () => resolve(false);

            document.body.appendChild(script);
        });
    };

    // =========================================================
    // DELETE MODULE
    // =========================================================
    const handleDeleteModule = async (moduleId: string) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Delete Module?",
            text: "Are you sure you want to delete this module?",
            background: "#161122",
            color: "#ffffff",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#374151",
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await deleteModule(moduleId);

            if (expandedModuleId === moduleId) {
                setExpandedModuleId(null);
            }

            await loadModules();

            await Swal.fire({
                icon: "success",
                title: "Module Deleted!",
                text: "The module has been deleted successfully.",
                background: "#161122",
                color: "#ffffff",
                confirmButtonColor: "#6366f1",
                timer: 1800,
                showConfirmButton: false,
            });

        } catch (error: any) {
            console.error("Delete module error:", error);

            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text:
                    error?.response?.data?.detail ||
                    "Unable to delete the module.",
                background: "#161122",
                color: "#ffffff",
                confirmButtonColor: "#6366f1",
            });
        }
    };

    // =========================================================
    // INITIAL LOAD
    // =========================================================
    useEffect(() => {
        loadCourse();
        loadModules();
    }, [id]);

    // =========================================================
    // LOADING
    // =========================================================
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-white">
                Loading course...
            </div>
        );
    }

    // =========================================================
    // COURSE NOT FOUND
    // =========================================================
    if (!course) {
        return (
            <div className="flex h-screen items-center justify-center text-gray-400">
                Course not found
            </div>
        );
    }

    // =========================================================
    // UI
    // =========================================================
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#0b0914] pt-24 p-8 text-white">

                {/* =====================================================
                    BACK BUTTON
                ====================================================== */}
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

                {/* =====================================================
                    COURSE HEADER
                ====================================================== */}
                <div
                    className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-[#2c2545]
                        bg-gradient-to-br
                        from-[#161122]
                        to-[#0f0b1d]
                        shadow-2xl
                    "
                >
                    <div className="grid gap-8 p-8 lg:grid-cols-2">

                        {/* =================================================
                            COURSE IMAGE
                        ================================================== */}
                        <div className="group relative overflow-hidden rounded-2xl">

                            <img
                                src={
                                    course.thumbnail &&
                                        course.thumbnail !== ""
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

                            {/* Category */}
                            <span
                                className="
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
                                "
                            >
                                {course.category}
                            </span>

                            {/* Price */}
                            <span
                                className="
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
                                "
                            >
                                {Number(course.price) === 0
                                    ? "FREE"
                                    : `₹${course.price}`}
                            </span>
                        </div>

                        {/* =================================================
                            COURSE INFO
                        ================================================== */}
                        <div className="flex flex-col justify-center">

                            <h1
                                className="
                                    text-4xl
                                    font-extrabold
                                    leading-tight
                                "
                            >
                                {course.title}
                            </h1>

                            {/* Rating */}
                            <div className="mt-4 flex items-center gap-2 text-yellow-400">
                                ⭐⭐⭐⭐⭐

                                <span className="text-gray-300">
                                    4.8 (120 Reviews)
                                </span>
                            </div>

                            {/* Description */}
                            <p
                                className="
                                    mt-5
                                    leading-relaxed
                                    text-gray-400
                                "
                            >
                                {course.description}
                            </p>

                            {/* Course Meta */}
                            <div
                                className="
                                    mt-6
                                    grid
                                    grid-cols-2
                                    gap-4
                                "
                            >
                                {/* Instructor */}
                                <div className="rounded-xl bg-[#241d35] p-4">
                                    <p className="text-sm text-gray-400">
                                        Instructor
                                    </p>

                                    <p className="font-semibold">
                                        {course.instructor}
                                    </p>
                                </div>

                                {/* Duration */}
                                <div className="rounded-xl bg-[#241d35] p-4">
                                    <p className="text-sm text-gray-400">
                                        Duration
                                    </p>

                                    <p className="font-semibold">
                                        {course.duration}
                                    </p>
                                </div>
                            </div>

                            {/* =================================================
                                ENROLL BUTTON
                            ================================================== */}
                            {!isAdmin && (
                                <button
                                    onClick={async () => {
                                        try {
                                            const userData =
                                                localStorage.getItem("user");

                                            if (!userData) {
                                                const result =
                                                    await Swal.fire({
                                                        icon: "info",
                                                        title: "Login Required",
                                                        text: "Please login first to enroll in this course.",
                                                        background:
                                                            "#161122",
                                                        color: "#ffffff",
                                                        confirmButtonText:
                                                            "Login Now",
                                                        cancelButtonText:
                                                            "Maybe Later",
                                                        showCancelButton:
                                                            true,
                                                        confirmButtonColor:
                                                            "#6366f1",
                                                        cancelButtonColor:
                                                            "#374151",
                                                    });

                                                if (result.isConfirmed) {
                                                    navigate("/login");
                                                }

                                                return;
                                            }

                                            const loggedInUser =
                                                JSON.parse(userData);

                                            if (!loggedInUser?.id) {
                                                navigate("/login");
                                                return;
                                            }

                                            // =====================================
                                            // FREE COURSE
                                            // =====================================
                                            if (Number(course.price) === 0) {

                                                try {
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

                                                    // =====================================================
                                                    // ENROLL USER
                                                    // If already enrolled, backend returns existing enrollment
                                                    // instead of throwing 400
                                                    // =====================================================
                                                    await enrollCourse(
                                                        course.id,
                                                        loggedInUser.id
                                                    );

                                                    // =====================================================
                                                    // SUCCESS
                                                    // =====================================================
                                                    await Swal.fire({
                                                        icon: "success",
                                                        title: "You're Enrolled! 🎉",
                                                        text: `You have successfully enrolled in ${course.title}.`,
                                                        background: "#161122",
                                                        color: "#ffffff",
                                                        confirmButtonText: "Start Learning",
                                                        confirmButtonColor: "#6366f1",
                                                    });

                                                    // =====================================================
                                                    // GO TO LEARNING PAGE
                                                    // =====================================================
                                                    navigate(`/dashboard/learn/${course.id}`);

                                                } catch (error: any) {

                                                    console.error(
                                                        "Free course enrollment error:",
                                                        error
                                                    );

                                                    Swal.fire({
                                                        icon: "warning",
                                                        title: "Enrollment Failed",
                                                        text:
                                                            error?.response?.data?.detail ||
                                                            "Unable to enroll in this course.",
                                                        background: "#161122",
                                                        color: "#ffffff",
                                                        confirmButtonColor: "#6366f1",
                                                    });
                                                }

                                                return;
                                            }

                                            // =====================================
                                            // PAID COURSE
                                            // =====================================
                                            const razorpayLoaded =
                                                await loadRazorpay();

                                            if (!razorpayLoaded) {
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Payment Error",
                                                    text: "Unable to load payment gateway.",
                                                    background:
                                                        "#161122",
                                                    color: "#ffffff",
                                                });

                                                return;
                                            }

                                            Swal.fire({
                                                title: "Preparing Payment...",
                                                text: "Please wait...",
                                                background:
                                                    "#161122",
                                                color: "#ffffff",
                                                allowOutsideClick:
                                                    false,
                                                showConfirmButton:
                                                    false,
                                                didOpen: () => {
                                                    Swal.showLoading();
                                                },
                                            });

                                            // Create Razorpay order
                                            const order =
                                                await createPaymentOrder(
                                                    course.id,
                                                    loggedInUser.id
                                                );

                                            Swal.close();

                                            const options = {
                                                key: order.key_id,

                                                amount: order.amount,

                                                currency:
                                                    order.currency ||
                                                    "INR",

                                                name: "LearnyFy",

                                                description:
                                                    course.title,

                                                order_id:
                                                    order.order_id,

                                                handler:
                                                    async function (
                                                        response: any
                                                    ) {
                                                        try {
                                                            Swal.fire({
                                                                title: "Verifying Payment...",
                                                                text: "Please wait...",
                                                                background:
                                                                    "#161122",
                                                                color: "#ffffff",
                                                                allowOutsideClick:
                                                                    false,
                                                                showConfirmButton:
                                                                    false,
                                                                didOpen: () => {
                                                                    Swal.showLoading();
                                                                },
                                                            });

                                                            await verifyPayment(
                                                                {
                                                                    razorpay_order_id:
                                                                        response.razorpay_order_id,

                                                                    razorpay_payment_id:
                                                                        response.razorpay_payment_id,

                                                                    razorpay_signature:
                                                                        response.razorpay_signature,

                                                                    course_id:
                                                                        course.id,

                                                                    user_id:
                                                                        loggedInUser.id,
                                                                }
                                                            );

                                                            await Swal.fire({
                                                                icon: "success",
                                                                title: "Payment Successful! 🎉",
                                                                text: `You are now enrolled in ${course.title}.`,
                                                                background:
                                                                    "#161122",
                                                                color: "#ffffff",
                                                                confirmButtonText:
                                                                    "Start Learning",
                                                                confirmButtonColor:
                                                                    "#6366f1",
                                                            });

                                                            navigate(`/dashboard/learn/${course.id}`);
                                                        } catch (
                                                        error: any
                                                        ) {
                                                            console.error(
                                                                "Payment verification error:",
                                                                error
                                                            );

                                                            Swal.fire({
                                                                icon: "error",
                                                                title: "Payment Verification Failed",
                                                                text:
                                                                    error
                                                                        ?.response
                                                                        ?.data
                                                                        ?.detail ||
                                                                    "Payment could not be verified.",
                                                                background:
                                                                    "#161122",
                                                                color: "#ffffff",
                                                                confirmButtonColor:
                                                                    "#6366f1",
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
                                                    ondismiss:
                                                        function () {
                                                            console.log(
                                                                "Payment cancelled"
                                                            );
                                                        },
                                                },
                                            };

                                            const razorpay =
                                                new (window as any).Razorpay(
                                                    options
                                                );

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
                                                    error?.response
                                                        ?.data?.detail ||
                                                    "Unable to process your request.",
                                                background:
                                                    "#161122",
                                                color: "#ffffff",
                                                confirmButtonColor:
                                                    "#6366f1",
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

                {/* =========================================================
                    MODULES SECTION
                ========================================================== */}
                <div
                    className="
                        mt-8
                        rounded-2xl
                        border
                        border-[#2c2545]
                        bg-[#161122]
                        p-8
                    "
                >

                    {/* =====================================================
                        MODULE HEADER
                    ====================================================== */}
                    <div className="flex items-center justify-between">

                        <h2 className="text-2xl font-bold">
                            Modules
                        </h2>

                        {isAdmin && (
                            <button
                                onClick={() => {
                                    setSelectedModule(null);
                                    setShowModuleModal(true);
                                }}
                                className="
                                    rounded-lg
                                    bg-purple-600
                                    px-4
                                    py-2
                                    transition
                                    hover:bg-purple-700
                                "
                            >
                                + Add Module
                            </button>
                        )}
                    </div>

                    {/* =====================================================
                        MODULE LIST
                    ====================================================== */}
                    <div className="mt-6 space-y-4">

                        {modules.length === 0 ? (
                            <div className="text-gray-400">
                                No modules available.
                            </div>
                        ) : (
                            modules.map((module, index) => {

                                const isExpanded =
                                    expandedModuleId === module.id;

                                return (
                                    <div
                                        key={module.id}
                                        className="
                                            overflow-hidden
                                            rounded-xl
                                            border
                                            border-[#2c2545]
                                            bg-[#1b1528]
                                        "
                                    >

                                        {/* =====================================
                                            MODULE HEADER
                                        ====================================== */}
                                        <div
                                            className={`
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                p-5
                                                transition
                                                ${isExpanded
                                                    ? "bg-[#211a31]"
                                                    : "hover:bg-[#211a31]"
                                                }
                                            `}
                                        >

                                            {/* LEFT SIDE */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleModule(
                                                        module.id
                                                    )
                                                }
                                                className="
                                                    flex
                                                    min-w-0
                                                    flex-1
                                                    items-center
                                                    gap-4
                                                    text-left
                                                "
                                            >

                                                {/* MODULE NUMBER */}
                                                <div
                                                    className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-purple-600
                                                        font-bold
                                                    "
                                                >
                                                    {index + 1}
                                                </div>

                                                {/* MODULE INFO */}
                                                <div className="min-w-0">

                                                    <h3
                                                        className="
                                                            text-lg
                                                            font-semibold
                                                            text-white
                                                        "
                                                    >
                                                        {module.title}
                                                    </h3>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-sm
                                                            text-gray-400
                                                        "
                                                    >
                                                        {module.description}
                                                    </p>

                                                </div>
                                            </button>

                                            {/* =================================
                                                RIGHT ACTIONS
                                            ================================== */}
                                            <div
                                                className="
                                                    flex
                                                    shrink-0
                                                    items-center
                                                    gap-2
                                                "
                                            >

                                                {isAdmin && (
                                                    <>
                                                        {/* ADD LESSON */}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedModuleId(
                                                                    module.id
                                                                );

                                                                setSelectedLesson(
                                                                    null
                                                                );

                                                                setShowLessonModal(
                                                                    true
                                                                );
                                                            }}
                                                            className="
                                                                rounded-lg
                                                                bg-green-600
                                                                px-3
                                                                py-2
                                                                text-sm
                                                                font-medium
                                                                transition
                                                                hover:bg-green-700
                                                            "
                                                        >
                                                            + Add Lesson
                                                        </button>

                                                        {/* EDIT MODULE */}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedModule(
                                                                    module
                                                                );

                                                                setShowModuleModal(
                                                                    true
                                                                );
                                                            }}
                                                            className="
                                                                rounded-lg
                                                                bg-blue-600
                                                                px-3
                                                                py-2
                                                                text-sm
                                                                transition
                                                                hover:bg-blue-700
                                                            "
                                                        >
                                                            Edit
                                                        </button>

                                                        {/* DELETE MODULE */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteModule(
                                                                    module.id
                                                                )
                                                            }
                                                            className="
                                                                rounded-lg
                                                                bg-red-600
                                                                px-3
                                                                py-2
                                                                text-sm
                                                                transition
                                                                hover:bg-red-700
                                                            "
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}

                                                {/* =================================
                                                    EXPAND / COLLAPSE
                                                ================================== */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleModule(
                                                            module.id
                                                        )
                                                    }
                                                    className="
                                                        rounded-lg
                                                        p-2
                                                        text-gray-300
                                                        transition
                                                        hover:bg-white/10
                                                        hover:text-white
                                                    "
                                                    aria-label={
                                                        isExpanded
                                                            ? "Collapse module"
                                                            : "Expand module"
                                                    }
                                                >
                                                    {isExpanded ? (
                                                        <ChevronUp
                                                            size={22}
                                                        />
                                                    ) : (
                                                        <ChevronDown
                                                            size={22}
                                                        />
                                                    )}
                                                </button>

                                            </div>
                                        </div>

                                        {/* =====================================
                                            LESSONS - ONLY WHEN OPEN
                                        ====================================== */}
                                        {isExpanded && (
                                            <div
                                                className="
                                                    border-t
                                                    border-[#2c2545]
                                                    px-5
                                                    pb-5
                                                "
                                            >

                                                {/* LESSON HEADER */}
                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        py-4
                                                    "
                                                >
                                                    <h4 className="font-semibold">
                                                        Lessons
                                                    </h4>
                                                </div>

                                                {/* NO LESSONS */}
                                                {lessons[module.id]
                                                    ?.length === 0 ? (
                                                    <p
                                                        className="
                                                            py-3
                                                            text-gray-400
                                                        "
                                                    >
                                                        No lessons available.
                                                    </p>
                                                ) : (
                                                    <div className="space-y-2">

                                                        {lessons[
                                                            module.id
                                                        ]?.map(
                                                            (
                                                                lesson: any,
                                                                lessonIndex: number
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        lesson.id
                                                                    }
                                                                    className="
                                                                        flex
                                                                        items-center
                                                                        justify-between
                                                                        gap-4
                                                                        rounded-lg
                                                                        bg-[#241d35]
                                                                        p-4
                                                                        transition
                                                                        hover:bg-[#2a213d]
                                                                    "
                                                                >

                                                                    {/* LESSON INFO */}
                                                                    <div className="min-w-0">

                                                                        <div
                                                                            className="
                                                                                flex
                                                                                items-center
                                                                                gap-3
                                                                            "
                                                                        >

                                                                            {/* LESSON NUMBER */}
                                                                            <span
                                                                                className="
                                                                                    flex
                                                                                    h-8
                                                                                    w-8
                                                                                    shrink-0
                                                                                    items-center
                                                                                    justify-center
                                                                                    rounded-full
                                                                                    bg-purple-600/30
                                                                                    text-sm
                                                                                    font-semibold
                                                                                    text-purple-300
                                                                                "
                                                                            >
                                                                                {lessonIndex +
                                                                                    1}
                                                                            </span>

                                                                            {/* LESSON TITLE */}
                                                                            <p
                                                                                className="
                                                                                    font-medium
                                                                                    text-white
                                                                                "
                                                                            >
                                                                                {
                                                                                    lesson.title
                                                                                }
                                                                            </p>

                                                                        </div>

                                                                        {/* LESSON DURATION */}
                                                                        <p
                                                                            className="
                                                                                mt-2
                                                                                ml-11
                                                                                text-sm
                                                                                text-gray-400
                                                                            "
                                                                        >
                                                                            {
                                                                                lesson.duration
                                                                            }
                                                                        </p>

                                                                    </div>

                                                                    {/* LESSON ACTIONS */}
                                                                    {isAdmin && (
                                                                        <div
                                                                            className="
                                                                                flex
                                                                                shrink-0
                                                                                gap-2
                                                                            "
                                                                        >

                                                                            {/* EDIT LESSON */}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setSelectedLesson(
                                                                                        lesson
                                                                                    );

                                                                                    setSelectedModuleId(
                                                                                        module.id
                                                                                    );

                                                                                    setShowLessonModal(
                                                                                        true
                                                                                    );
                                                                                }}
                                                                                className="
                                                                                    rounded-lg
                                                                                    bg-blue-600
                                                                                    px-3
                                                                                    py-1.5
                                                                                    text-sm
                                                                                    transition
                                                                                    hover:bg-blue-700
                                                                                "
                                                                            >
                                                                                Edit
                                                                            </button>

                                                                            {/* DELETE LESSON */}
                                                                            <button
                                                                                type="button"
                                                                                onClick={async () => {
                                                                                    const result = await Swal.fire({
                                                                                        icon: "warning",
                                                                                        title: "Delete Lesson?",
                                                                                        text: `Are you sure you want to delete "${lesson.title}"?`,
                                                                                        background: "#161122",
                                                                                        color: "#ffffff",
                                                                                        showCancelButton: true,
                                                                                        confirmButtonText: "Yes, Delete",
                                                                                        cancelButtonText: "Cancel",
                                                                                        confirmButtonColor: "#dc2626",
                                                                                        cancelButtonColor: "#374151",
                                                                                        reverseButtons: true,
                                                                                    });

                                                                                    if (!result.isConfirmed) {
                                                                                        return;
                                                                                    }

                                                                                    try {
                                                                                        await deleteLesson(lesson.id);

                                                                                        await loadLessons(module.id);

                                                                                        await Swal.fire({
                                                                                            icon: "success",
                                                                                            title: "Lesson Deleted!",
                                                                                            text: "The lesson has been deleted successfully.",
                                                                                            background: "#161122",
                                                                                            color: "#ffffff",
                                                                                            confirmButtonColor: "#6366f1",
                                                                                            timer: 1800,
                                                                                            showConfirmButton: false,
                                                                                        });

                                                                                    } catch (error: any) {
                                                                                        console.error(
                                                                                            "Delete lesson error:",
                                                                                            error
                                                                                        );

                                                                                        Swal.fire({
                                                                                            icon: "error",
                                                                                            title: "Delete Failed",
                                                                                            text:
                                                                                                error?.response?.data?.detail ||
                                                                                                "Unable to delete the lesson.",
                                                                                            background: "#161122",
                                                                                            color: "#ffffff",
                                                                                            confirmButtonColor: "#6366f1",
                                                                                        });
                                                                                    }
                                                                                }}
                                                                                className="
                                                                                    rounded-lg
                                                                                    bg-red-600
                                                                                    px-3
                                                                                    py-1.5
                                                                                    text-sm
                                                                                    transition
                                                                                    hover:bg-red-700
                                                                                "
                                                                            >
                                                                                Delete
                                                                            </button>

                                                                        </div>
                                                                    )}

                                                                </div>
                                                            )
                                                        )}

                                                    </div>
                                                )}

                                            </div>
                                        )}

                                    </div>
                                );
                            })
                        )}

                    </div>
                </div>

                {/* =========================================================
                    MODULE MODAL
                ========================================================== */}
                <ModuleModal
                    open={showModuleModal}
                    onClose={() =>
                        setShowModuleModal(false)
                    }
                >
                    <ModuleForm
                        initialData={selectedModule}
                        onSuccess={async (module) => {
                            try {
                                if (selectedModule) {
                                    await updateModule(
                                        selectedModule.id,
                                        module
                                    );

                                    await loadModules();

                                    setSelectedModule(null);
                                    setShowModuleModal(false);

                                    await Swal.fire({
                                        icon: "success",
                                        title: "Module Updated! 🎉",
                                        text: "Module has been updated successfully.",
                                        background: "#161122",
                                        color: "#ffffff",
                                        confirmButtonColor: "#6366f1",
                                        timer: 1800,
                                        showConfirmButton: false,
                                    });

                                } else {
                                    await createModule(
                                        id!,
                                        module
                                    );

                                    await loadModules();

                                    setSelectedModule(null);
                                    setShowModuleModal(false);

                                    await Swal.fire({
                                        icon: "success",
                                        title: "Module Added! 🎉",
                                        text: "New module has been added successfully.",
                                        background: "#161122",
                                        color: "#ffffff",
                                        confirmButtonColor: "#6366f1",
                                        timer: 1800,
                                        showConfirmButton: false,
                                    });
                                }

                            } catch (error: any) {
                                console.error(
                                    "Module Error:",
                                    error
                                );

                                Swal.fire({
                                    icon: "error",
                                    title: "Something went wrong",
                                    text:
                                        error?.response?.data?.detail ||
                                        "Unable to save module.",
                                    background: "#161122",
                                    color: "#ffffff",
                                    confirmButtonColor: "#6366f1",
                                });
                            }
                        }}
                    />
                </ModuleModal>

                {/* =========================================================
                    LESSON MODAL
                ========================================================== */}
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

                                    await loadLessons(
                                        selectedModuleId
                                    );

                                    setSelectedLesson(null);
                                    setShowLessonModal(false);

                                    await Swal.fire({
                                        icon: "success",
                                        title: "Lesson Updated! 🎉",
                                        text: "Lesson has been updated successfully.",
                                        background: "#161122",
                                        color: "#ffffff",
                                        confirmButtonColor: "#6366f1",
                                        timer: 1800,
                                        showConfirmButton: false,
                                    });

                                } else {
                                    await createLesson(
                                        selectedModuleId,
                                        lesson
                                    );

                                    await loadLessons(
                                        selectedModuleId
                                    );

                                    setSelectedLesson(null);
                                    setShowLessonModal(false);

                                    await Swal.fire({
                                        icon: "success",
                                        title: "Lesson Added! 🎉",
                                        text: "New lesson has been added successfully.",
                                        background: "#161122",
                                        color: "#ffffff",
                                        confirmButtonColor: "#6366f1",
                                        timer: 1800,
                                        showConfirmButton: false,
                                    });
                                }

                            } catch (error: any) {
                                console.error(
                                    "Lesson Error:",
                                    error
                                );

                                Swal.fire({
                                    icon: "error",
                                    title: "Something went wrong",
                                    text:
                                        error?.response?.data?.detail ||
                                        "Unable to save lesson.",
                                    background: "#161122",
                                    color: "#ffffff",
                                    confirmButtonColor: "#6366f1",
                                });
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