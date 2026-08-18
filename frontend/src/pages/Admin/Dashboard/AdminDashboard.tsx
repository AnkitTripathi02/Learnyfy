
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
    FaCheckCircle,
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

            <div className="grid gap-6 xl:grid-cols-3">

                {/* ================= QUICK ACTIONS ================= */}

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


                {/* ================= SYSTEM STATUS ================= */}

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
                            {
                                icon: <FaCloud />,
                                title: "Cloud Storage",
                                status: "Healthy",
                            },
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


                {/* ================= PLATFORM OVERVIEW ================= */}

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#141222]">

                    <div className="mb-5">

                        <h2 className="font-bold text-gray-900 dark:text-white">
                            Platform Overview
                        </h2>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Current platform numbers
                        </p>

                    </div>

                    <div className="space-y-4">

                        <div>

                            <div className="mb-2 flex justify-between text-sm">

                                <span className="text-gray-500 dark:text-gray-400">
                                    Users
                                </span>

                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {data.total_users}
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">

                                <div
                                    className="h-full rounded-full bg-purple-500"
                                    style={{
                                        width: `${Math.min(
                                            Number(data.total_users) || 0,
                                            100
                                        )}%`,
                                    }}
                                />

                            </div>

                        </div>


                        <div>

                            <div className="mb-2 flex justify-between text-sm">

                                <span className="text-gray-500 dark:text-gray-400">
                                    Courses
                                </span>

                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {data.total_courses}
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">

                                <div
                                    className="h-full rounded-full bg-blue-500"
                                    style={{
                                        width: `${Math.min(
                                            Number(data.total_courses) || 0,
                                            100
                                        )}%`,
                                    }}
                                />

                            </div>

                        </div>


                        <div>

                            <div className="mb-2 flex justify-between text-sm">

                                <span className="text-gray-500 dark:text-gray-400">
                                    Enrollments
                                </span>

                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {data.total_enrollments}
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">

                                <div
                                    className="h-full rounded-full bg-green-500"
                                    style={{
                                        width: `${Math.min(
                                            Number(data.total_enrollments) || 0,
                                            100
                                        )}%`,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
          ANALYTICS + ACTIVITY
      ===================================================== */}

            <div className="grid gap-6 lg:grid-cols-2">

                {/* ================= REVENUE ANALYTICS ================= */}

                <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-[#141222]">

                    <div className="mb-1 flex items-center justify-between">

                        <div>

                            <div className="flex items-center gap-2">

                                <FaChartLine className="text-purple-500 dark:text-purple-400" />

                                <h2 className="font-bold text-gray-900 dark:text-white">
                                    Revenue Analytics
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


                {/* ================= RECENT ACTIVITY ================= */}

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

            </div>

        </div>
    );
};

export default AdminDashboard;
