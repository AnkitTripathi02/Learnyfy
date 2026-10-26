
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard } from "../api/adminDashboardApi";

import {
    FaUsers,
    FaBook,
    FaGraduationCap,
    FaRupeeSign,
    FaPlus,
    FaChartLine,
    FaServer,
    FaDatabase,
    FaCloud,
    FaArrowUp,
    FaArrowRight,
} from "react-icons/fa";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showDashboardMenu, setShowDashboardMenu] = useState(false);

    const [visibleSections, setVisibleSections] = useState({
        quickActions: true,
        systemStatus: true,
        platformOverview: true,
        overallAnalytics: true,
        recentActivity: true,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const res = await getAdminDashboard();

            setData(res);
        } catch (error) {
            console.error("Admin dashboard error:", error);
        } finally {
            setLoading(false);
        }
    };


    const toggleSection = (section: keyof typeof visibleSections) => {
        setVisibleSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    /* =========================
       LOADING
    ========================= */

    if (loading || !data) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="text-center">

                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />

                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Loading dashboard...
                    </p>

                </div>
            </div>
        );
    }

    /* =========================
       STATS
    ========================= */

    const PLATFORM_TARGETS = {
        users: 100,
        courses: 50,
        enrollments: 100,
    };

    const getProgress = (current: number, target: number) => {
        if (!target || target <= 0) return 0;

        return Math.min(
            Math.round((current / target) * 100),
            100
        );
    };

    const userProgress = getProgress(
        Number(data.total_users) || 0,
        PLATFORM_TARGETS.users
    );

    const courseProgress = getProgress(
        Number(data.total_courses) || 0,
        PLATFORM_TARGETS.courses
    );

    const enrollmentProgress = getProgress(
        Number(data.total_enrollments) || 0,
        PLATFORM_TARGETS.enrollments
    );


    const stats = [
        {
            title: "Total Users",
            value: data.total_users ?? 0,
            icon: <FaUsers />,
            color: "purple",
            description: "Registered users",
        },
        {
            title: "Total Courses",
            value: data.total_courses ?? 0,
            icon: <FaBook />,
            color: "blue",
            description: "Published courses",
        },
        {
            title: "Enrollments",
            value: data.total_enrollments ?? 0,
            icon: <FaGraduationCap />,
            color: "green",
            description: "Course enrollments",
        },
        {
            title: "Total Revenue",
            value: `₹${Number(
                data.paid_enrollment_amount ?? 0
            ).toLocaleString("en-IN")}`,
            icon: <FaRupeeSign />,
            color: "yellow",
            description: "Paid enrollments",
        },
    ];

    const iconBg: Record<string, string> = {
        purple:
            "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",

        blue:
            "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",

        green:
            "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",

        yellow:
            "bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-400",
    };

    /* =========================
       CHART DATA
    ========================= */

    const revenueData = [
        {
            name: "Revenue",
            value: Number(data.paid_enrollment_amount ?? 0),
        },
        {
            name: "Courses",
            value: Number(data.total_courses ?? 0),
        },
        {
            name: "Enrollments",
            value: Number(data.total_enrollments ?? 0),
        },
    ];

    const COLORS = [
        "#8B5CF6",
        "#3B82F6",
        "#10B981",
    ];

    return (
        <div className="min-h-full space-y-3.5">

            {/* =====================================================
          HEADER
      ===================================================== */}
            {/* 
            <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#141222] lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="mb-2 flex items-center gap-2">

                        <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                            ADMIN PANEL
                        </span>

                        <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                            <FaCheckCircle />
                            System Operational
                        </span>

                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Monitor your learning platform and manage everything from one place.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/admin/courses")}
                    className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/30"
                >
                    <FaPlus className="transition-transform duration-300 group-hover:rotate-90" />

                    Create Course

                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </button>

            </div> */}


            {/* =====================================================
          STATS
      ===================================================== */}

            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((item, index) => (

                    <div
                        key={index}
                        className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5 dark:border-white/10 dark:bg-[#141222]"
                    >

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {item.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.value}
                                </h2>

                            </div>

                            <div
                                className={`rounded-xl p-3 text-xl transition-transform duration-300 group-hover:scale-110 ${iconBg[item.color]}`}
                            >
                                {item.icon}
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-white/5">

                            <span className="flex items-center gap-1 text-xs font-semibold text-green-500">
                                <FaArrowUp />
                                Active
                            </span>

                            <span className="text-xs text-gray-400">
                                {item.description}
                            </span>

                        </div>

                    </div>

                ))}

            </div>


            {/* =====================================================
          MAIN GRID
      ===================================================== */}
            <div
                className={`grid gap-6 ${[
                    visibleSections.quickActions,
                    visibleSections.systemStatus,
                    visibleSections.platformOverview,
                ].filter(Boolean).length === 1
                    ? "xl:grid-cols-1"
                    : [
                        visibleSections.quickActions,
                        visibleSections.systemStatus,
                        visibleSections.platformOverview,
                    ].filter(Boolean).length === 2
                        ? "xl:grid-cols-2"
                        : "xl:grid-cols-3"
                    }`}
            >

                {/* ================= QUICK ACTIONS ================= */}
                {visibleSections.quickActions && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#141222]">

                        <div className="mb-5">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500 dark:text-purple-400">
                                    <FaChartLine />
                                </div>

                                <div>

                                    <h2 className="font-bold text-gray-900 dark:text-white">
                                        Quick Actions
                                    </h2>

                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Manage your platform
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="space-y-3">

                            <button
                                onClick={() => navigate("/admin/courses")}
                                className="group flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-4 text-left text-white shadow-lg shadow-purple-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/20"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg bg-white/15 p-2">
                                        <FaPlus />
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold">
                                            Create New Course
                                        </p>

                                        <p className="text-xs text-white/70">
                                            Add a new course
                                        </p>

                                    </div>

                                </div>

                                <FaArrowRight className="transition-transform group-hover:translate-x-1" />

                            </button>


                            <button
                                onClick={() => navigate("/admin/courses")}
                                className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-left transition-all duration-300 hover:border-purple-500 hover:bg-purple-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-purple-500/10"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500 dark:text-blue-400">
                                        <FaBook />
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Manage Courses
                                        </p>

                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Edit or manage courses
                                        </p>

                                    </div>

                                </div>

                                <FaArrowRight className="text-gray-400 transition-transform group-hover:translate-x-1" />

                            </button>

                        </div>

                    </div>
                )}

                {/* ================= SYSTEM STATUS ================= */}
                {visibleSections.systemStatus && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-[#141222]">

                        <div className="mb-5">

                            <h2 className="font-bold text-gray-900 dark:text-white">
                                System Status
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Current platform services
                            </p>

                        </div>

                        <div className="space-y-3">

                            {[
                                {
                                    icon: <FaServer />,
                                    title: "Backend",
                                    status: "Online",
                                },
                                {
                                    icon: <FaDatabase />,
                                    title: "Database",
                                    status: "Connected",
                                },
                                {
                                    icon: <FaRupeeSign />,
                                    title: "Payment Gateway",
                                    status: "Active",
                                },
                                // {
                                //     icon: <FaCloud />,
                                //     title: "Cloud Storage",
                                //     status: "Healthy",
                                // },
                            ].map((item, index) => (

                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/5"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {item.icon}
                                        </div>

                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {item.title}
                                        </span>

                                    </div>

                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-green-500">

                                        <span className="h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />

                                        {item.status}

                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>
                )}

                {/* ================= PLATFORM OVERVIEW ================= */}
                {visibleSections.platformOverview && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#141222]">

                        <div className="mb-5">

                            <h2 className="font-bold text-gray-900 dark:text-white">
                                Platform Overview
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Current platform numbers
                            </p>

                        </div>

                        <div className="space-y-3">

                            <div className="mb-2">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">

                                        <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                                            <svg
                                                className="w-4 h-4 text-purple-600 dark:text-purple-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Users
                                            </p>

                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {data.total_users} / {PLATFORM_TARGETS.users}
                                            </p>
                                        </div>

                                    </div>

                                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                        {userProgress}%
                                    </span>
                                </div>

                                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all duration-700"
                                        style={{
                                            width: `${userProgress}%`,
                                        }}
                                    />
                                </div>
                            </div>


                            {/* Courses */}
                            <div className="mb-2">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">

                                        <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                                            <svg
                                                className="w-4 h-4 text-blue-600 dark:text-blue-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Courses
                                            </p>

                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {data.total_courses} / {PLATFORM_TARGETS.courses}
                                            </p>
                                        </div>

                                    </div>

                                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                        {courseProgress}%
                                    </span>
                                </div>

                                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-700"
                                        style={{
                                            width: `${courseProgress}%`,
                                        }}
                                    />
                                </div>
                            </div>


                            {/* Enrollments */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">

                                        <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
                                            <svg
                                                className="w-4 h-4 text-green-600 dark:text-green-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 14l6.16-3.422A12.083 12.083 0 0118 15.5c0 1.657-2.686 3-6 3s-6-1.343-6-3c0-.33.05-.654.145-.967L12 14z"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                Enrollments
                                            </p>

                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {data.total_enrollments} / {PLATFORM_TARGETS.enrollments}
                                            </p>
                                        </div>

                                    </div>

                                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                                        {enrollmentProgress}%
                                    </span>
                                </div>

                                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full transition-all duration-700"
                                        style={{
                                            width: `${enrollmentProgress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>


            {/* =====================================================
          ANALYTICS + ACTIVITY
      ===================================================== */}

            <div
                className={`grid gap-6 ${[
                        visibleSections.overallAnalytics,
                        visibleSections.recentActivity,
                    ].filter(Boolean).length === 1
                        ? "lg:grid-cols-1"
                        : "lg:grid-cols-2"
                    }`}
            >

                {/* ================= REVENUE ANALYTICS ================= */}
                {visibleSections.overallAnalytics && (
                    <div className="rounded-2xl border border-gray-200 p-2 shadow-sm dark:border-white/10 dark:bg-[#141222]">

                        <div className="mb-1 flex items-center justify-between">

                            <div>

                                <div className="flex items-center gap-2">

                                    <FaChartLine className="text-purple-500 dark:text-purple-400" />

                                    <h2 className="font-bold text-gray-900 dark:text-white">
                                        Overall Analytics
                                    </h2>

                                </div>

                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Platform performance overview
                                </p>

                            </div>

                        </div>

                        <div className="h-72">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={revenueData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={95}
                                        paddingAngle={4}
                                        stroke="none"
                                        isAnimationActive
                                    >

                                        {revenueData.map(
                                            (_, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index]}
                                                    stroke="none"
                                                />
                                            )
                                        )}

                                    </Pie>

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#141222",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "12px",
                                            color: "#fff",
                                        }}
                                    />

                                    <Legend
                                        wrapperStyle={{
                                            fontSize: 12,
                                        }}
                                    />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>
                )}

                {/* ================= RECENT ACTIVITY ================= */}
                {visibleSections.recentActivity && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-[#141222]">

                        <div className="mb-1">

                            <h2 className="font-bold text-gray-900 dark:text-white">
                                Recent Activity
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Latest platform statistics
                            </p>

                        </div>

                        <div className="space-y-3">

                            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-white/5">

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg bg-purple-500/10 p-2 text-purple-500 dark:text-purple-400">
                                        <FaUsers />
                                    </div>

                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Total Users
                                    </span>

                                </div>

                                <span className="font-bold text-gray-900 dark:text-white">
                                    {data.total_users}
                                </span>

                            </div>


                            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-white/5">

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500 dark:text-blue-400">
                                        <FaBook />
                                    </div>

                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Total Courses
                                    </span>

                                </div>

                                <span className="font-bold text-gray-900 dark:text-white">
                                    {data.total_courses}
                                </span>

                            </div>


                            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-white/5">

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg bg-green-500/10 p-2 text-green-500 dark:text-green-400">
                                        <FaGraduationCap />
                                    </div>

                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Total Enrollments
                                    </span>

                                </div>

                                <span className="font-bold text-gray-900 dark:text-white">
                                    {data.total_enrollments}
                                </span>

                            </div>


                            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-white/5">

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg bg-yellow-500/10 p-2 text-yellow-500 dark:text-yellow-400">
                                        <FaRupeeSign />
                                    </div>

                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Paid Revenue
                                    </span>

                                </div>

                                <span className="font-bold text-green-500">
                                    ₹
                                    {Number(
                                        data.paid_enrollment_amount ?? 0
                                    ).toLocaleString("en-IN")}
                                </span>

                            </div>

                        </div>

                    </div>
                )}
            </div>
            {/* =====================================================
                DASHBOARD CUSTOMIZATION
            ===================================================== */}

            <div className="fixed bottom-6 right-6 z-50">

                {/* CUSTOMIZATION MENU */}

                {showDashboardMenu && (
                    <div className="absolute bottom-14 right-0 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#141222]">

                        <div className="mb-3">

                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                                Dashboard Sections
                            </h3>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Show or hide sections
                            </p>

                        </div>


                        <div className="space-y-1">

                            {/* QUICK ACTIONS */}

                            <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-white/5">

                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                    Quick Actions
                                </span>

                                <input
                                    type="checkbox"
                                    checked={visibleSections.quickActions}
                                    onChange={() =>
                                        toggleSection("quickActions")
                                    }
                                    className="h-4 w-4 accent-purple-600"
                                />

                            </label>


                            {/* SYSTEM STATUS */}

                            <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-white/5">

                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                    System Status
                                </span>

                                <input
                                    type="checkbox"
                                    checked={visibleSections.systemStatus}
                                    onChange={() =>
                                        toggleSection("systemStatus")
                                    }
                                    className="h-4 w-4 accent-purple-600"
                                />

                            </label>


                            {/* PLATFORM OVERVIEW */}

                            <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-white/5">

                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                    Platform Overview
                                </span>

                                <input
                                    type="checkbox"
                                    checked={visibleSections.platformOverview}
                                    onChange={() =>
                                        toggleSection("platformOverview")
                                    }
                                    className="h-4 w-4 accent-purple-600"
                                />

                            </label>


                            {/* OVERALL ANALYTICS */}

                            <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-white/5">

                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                    Overall Analytics
                                </span>

                                <input
                                    type="checkbox"
                                    checked={visibleSections.overallAnalytics}
                                    onChange={() =>
                                        toggleSection("overallAnalytics")
                                    }
                                    className="h-4 w-4 accent-purple-600"
                                />

                            </label>


                            {/* RECENT ACTIVITY */}

                            <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-white/5">

                                <span className="text-sm text-gray-700 dark:text-gray-200">
                                    Recent Activity
                                </span>

                                <input
                                    type="checkbox"
                                    checked={visibleSections.recentActivity}
                                    onChange={() =>
                                        toggleSection("recentActivity")
                                    }
                                    className="h-4 w-4 accent-purple-600"
                                />

                            </label>

                        </div>

                    </div>
                )}


                {/* THREE DOT BUTTON */}

                <button
                    type="button"
                    onClick={() =>
                        setShowDashboardMenu((prev) => !prev)
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:bg-purple-700"
                    title="Customize Dashboard"
                >
                    ⋮
                </button>

            </div>
        </div>
    );
};

export default AdminDashboard;
