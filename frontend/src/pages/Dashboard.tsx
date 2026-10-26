import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../api/profileApi";
import DashboardCard from "../components/dashboard/DashboardCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import { getDashboardStats } from "../api/dashboardApi";

import {
    FaBookOpen,
    FaCheckCircle,
    FaClipboardCheck,
    FaArrowRight,
    FaPlay,
    FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

const [stats, setStats] = useState({
    total_courses: 0,
    completed_courses: 0,
    overall_progress: 0,
    total_lessons: 0,
    completed_lessons: 0,
    recent_activity: [],
    last_course_id: null,
    last_lesson_id: null,
});
    const verifyUser = async () => {
        try {
            await getMyProfile();
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/login", { replace: true });
        }
    };

const loadDashboardStats = async () => {
    try {
        const response = await getDashboardStats();

        console.log("Dashboard Stats Response:", response.data);

        setStats(response.data);
    } catch (error) {
        console.error("Failed to load dashboard stats", error);
    }
};

    useEffect(() => {
        verifyUser();
        loadDashboardStats();
    }, [navigate]);

const handleContinueLearning = () => {
    if (stats.last_course_id && stats.last_lesson_id) {
        navigate(
            `/dashboard/learn/${stats.last_course_id}/lesson/${stats.last_lesson_id}`
        );
    } else {
        navigate("/dashboard/my-courses");
    }
};

    return (
        <div className="min-h-full bg-[#090817] p-1 sm:px-6 lg:px-8">

            {/* ================= WELCOME SECTION ================= */}
            <section className="relative overflow-hidden rounded-3xl border border-[#292440] bg-gradient-to-br from-[#17132a] via-[#121020] to-[#0d0b18] p-2 sm:p-8">

                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-indigo-600/10 blur-3xl" />

                <div className="relative flex flex-col justify-between gap-2 lg:flex-row lg:items-center">

                    <div>
                        <div className="mb-1 inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-400" />
                            Student Dashboard
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Welcome back, {user.full_name || "Student"} 👋
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                            Keep building your skills, complete your courses,
                            and stay consistent with your learning journey.
                        </p>
                    </div>

                    <button
                        // onClick={() => navigate("/dashboard/my-courses")}
                        onClick={handleContinueLearning}
                        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-900/40 sm:w-auto"
                    >
                        <FaPlay className="text-sm" />
                        Continue Learning
                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                </div>
            </section>


            {/* ================= STATS ================= */}
            <section className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <DashboardCard
                    title="Total Courses"
                    value={stats.total_courses}
                    icon={<FaBookOpen />}
                />

                <DashboardCard
                    title="Completed Courses"
                    value={stats.completed_courses}
                    icon={<FaCheckCircle />}
                />

                <DashboardCard
                    title="Overall Progress"
                    value={`${stats.overall_progress}%`}
                    icon={<FaChartLine />}
                />

                <DashboardCard
                    title="Completed Lessons"
                    value={stats.completed_lessons}
                    icon={<FaClipboardCheck />}
                />

            </section>


            {/* ================= LEARNING HEADER ================= */}
            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

                <div>
                    <h2 className="mt-3 text-2xl font-bold text-white mb-0.5 ml-2">
                        Learning Overview
                    </h2>


                </div>

                <button
                    onClick={() => navigate("/dashboard/my-courses")}
                    className="flex items-center gap-2 text-sm font-medium text-purple-400 transition hover:text-purple-300"
                >
                    View My Courses
                    <FaArrowRight className="text-xs" />
                </button>

            </div>


            {/* ================= PROGRESS + ACTIVITY ================= */}
            <section className="mt-0.5 grid gap-5 xl:grid-cols-3">

                <div className="xl:col-span-2">
                    <ProgressCard
                        overallProgress={stats.overall_progress}
                        totalCourses={stats.total_courses}
                        completedCourses={stats.completed_courses}
                        totalLessons={stats.total_lessons}
                        completedLessons={stats.completed_lessons}
                    />
                </div>

                <div>
                    <ActivityCard activities={stats.recent_activity} />
                </div>

            </section>


            {/* ================= QUICK ACTIONS ================= */}
            <section className="mt-3 grid gap-4 md:grid-cols-2">

                {/* Explore Courses */}
                <button
                    onClick={() => navigate("/courses")}
                    className="group flex items-center justify-between rounded-2xl border border-[#292440] bg-[#111021] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/40 hover:bg-[#15132a]"
                >
                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                            <FaBookOpen />
                        </div>

                        <div>
                            <h3 className="font-semibold text-white">
                                Explore New Courses
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Discover courses and expand your skills.
                            </p>
                        </div>

                    </div>

                    <FaArrowRight className="text-sm text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-purple-400" />
                </button>


                {/* Progress */}
                <button
                    onClick={() => navigate("/my-progress")}
                    className="group flex items-center justify-between rounded-2xl border border-[#292440] bg-[#111021] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:bg-[#15132a]"
                >
                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                            <FaChartLine />
                        </div>

                        <div>
                            <h3 className="font-semibold text-white">
                                Check Your Progress
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                See how far you've come in your learning journey.
                            </p>
                        </div>

                    </div>

                    <FaArrowRight className="text-sm text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-indigo-400" />
                </button>

            </section>

        </div>
    );
};

export default Dashboard;