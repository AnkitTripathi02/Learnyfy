import { useEffect, useState } from "react";

import {
    FaRupeeSign,
    FaCreditCard,
    FaCheckCircle,
    FaUsers,
    FaBookOpen,
    FaChartLine,
    FaGraduationCap,
    FaMoneyBillWave,
} from "react-icons/fa";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
} from "recharts";

import { getAnalytics } from "../../../api/analyticsApi";

interface AnalyticsData {
    summary: {
        total_revenue: number;
        total_payments: number;
        successful_payments: number;
        pending_payments: number;
        failed_payments: number;
        total_enrollments: number;
        free_enrollments: number;
        paid_enrollments: number;
    };

    monthly_revenue: {
        month: string;
        revenue: number;
    }[];

    monthly_enrollments: {
        month: string;
        enrollments: number;
    }[];

    monthly_users: {
        month: string;
        users: number;
    }[];

    top_courses: {
        course_id: string;
        course_title: string;
        enrollments: number;
        revenue: number;
    }[];
}

const AdminAnalytics = () => {
    const [data, setData] =
        useState<AnalyticsData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAnalytics();

            setData(response);
        } catch (err) {
            console.error(
                "Analytics error:",
                err
            );

            setError(
                "Unable to load analytics."
            );
        } finally {
            setLoading(false);
        }
    };

    

    /* ================= LOADING ================= */

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
            </div>
        );
    }

    /* ================= ERROR ================= */

    if (error || !data) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center text-white">
                <p className="mb-4 text-red-400">
                    {error || "Analytics unavailable"}
                </p>

                <button
                    onClick={loadAnalytics}
                    className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
                >
                    Retry
                </button>
            </div>
        );
    }

    const {
        summary,
        monthly_revenue,
        monthly_enrollments,
        monthly_users,
        top_courses,
    } = data;

    /* ================= CALCULATIONS ================= */

    const paidPercentage =
        summary.total_enrollments > 0
            ? Math.round(
                  (summary.paid_enrollments /
                      summary.total_enrollments) *
                      100
              )
            : 0;

    const freePercentage =
        summary.total_enrollments > 0
            ? Math.round(
                  (summary.free_enrollments /
                      summary.total_enrollments) *
                      100
              )
            : 0;

    const successPercentage =
        summary.total_payments > 0
            ? Math.round(
                  (summary.successful_payments /
                      summary.total_payments) *
                      100
              )
            : 0;

    const totalPaymentIssues =
        summary.pending_payments +
        summary.failed_payments;

    const latestUsers =
        monthly_users.length > 0
            ? monthly_users[
                  monthly_users.length - 1
              ].users
            : 0;

    const latestEnrollments =
        monthly_enrollments.length > 0
            ? monthly_enrollments[
                  monthly_enrollments.length - 1
              ].enrollments
            : 0;

    return (
        <div className="min-h-full space-y-6 bg-transparent p-6">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div>
                <h1 className="text-2xl font-bold text-white">
                    Analytics
                </h1>

                <p className="mt-1 text-sm text-white/40">
                    Monitor your platform performance
                    and business growth.
                </p>
            </div>


            {/* =====================================================
                SUMMARY CARDS
            ===================================================== */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {/* TOTAL REVENUE */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-white/40">
                                Total Revenue
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-white">
                                ₹
                                {summary.total_revenue.toLocaleString(
                                    "en-IN"
                                )}
                            </h2>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
                            <FaRupeeSign />
                        </div>

                    </div>

                </div>


                {/* TOTAL PAYMENTS */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-white/40">
                                Total Payments
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-white">
                                {summary.total_payments}
                            </h2>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                            <FaCreditCard />
                        </div>

                    </div>

                </div>


                {/* SUCCESSFUL PAYMENTS */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-white/40">
                                Successful Payments
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-white">
                                {summary.successful_payments}
                            </h2>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                            <FaCheckCircle />
                        </div>

                    </div>

                </div>


                {/* TOTAL ENROLLMENTS */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-white/40">
                                Total Enrollments
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-white">
                                {summary.total_enrollments}
                            </h2>

                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                            <FaBookOpen />
                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                CHARTS
            ===================================================== */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* ================= REVENUE ================= */}

{/* ================= REVENUE ================= */}

<div className="rounded-2xl border border-white/10 bg-[#171528] p-6">

    <div className="mb-5 flex items-center justify-between">

        <div>

            <h2 className="font-semibold text-white">
                Revenue Overview
            </h2>

            <p className="mt-1 text-xs text-white/35">
                Last 12 months
            </p>

        </div>

        <FaChartLine className="text-purple-400" />

    </div>


    <div className="h-[300px]">

        <ResponsiveContainer
            width="100%"
            height="100%"
        >

            <AreaChart
                data={monthly_revenue}
                margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                }}
            >

                {/* GRID */}

                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.06)"
                    vertical={false}
                />


                {/* X AXIS */}

                <XAxis
                    dataKey="month"
                    stroke="#777"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{
                        stroke: "rgba(255,255,255,0.12)",
                    }}
                />


                {/* Y AXIS */}

                <YAxis
                    stroke="#777"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                        `₹${value}`
                    }
                />


                {/* TOOLTIP */}

                <Tooltip
                    cursor={{
                        stroke: "rgba(168,85,247,0.35)",
                        strokeWidth: 1,
                    }}
                    contentStyle={{
                        backgroundColor: "#211d35",
                        border:
                            "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "12px",
                        color: "#fff",
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,0.35)",
                    }}
                    labelStyle={{
                        color: "#c4b5fd",
                        marginBottom: "4px",
                    }}
                    formatter={(value) =>
                        `₹${Number(value).toLocaleString(
                            "en-IN"
                        )}`
                    }
                />


                {/* MOUNTAIN AREA */}

                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#a855f7"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    fillOpacity={1}
                    dot={{
                        r: 4,
                        fill: "#a855f7",
                        stroke: "#fff",
                        strokeWidth: 2,
                    }}
                    activeDot={{
                        r: 7,
                        fill: "#a855f7",
                        stroke: "#fff",
                        strokeWidth: 2,
                    }}
                />


                {/* GRADIENT */}

                <defs>

                    <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >

                        <stop
                            offset="0%"
                            stopColor="#a855f7"
                            stopOpacity={0.45}
                        />

                        <stop
                            offset="55%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.20}
                        />

                        <stop
                            offset="100%"
                            stopColor="#7c3aed"
                            stopOpacity={0.02}
                        />

                    </linearGradient>

                </defs>

            </AreaChart>

        </ResponsiveContainer>

    </div>

</div>


                {/* ================= ENROLLMENTS ================= */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-6">

                    <div className="mb-5">

                        <h2 className="font-semibold text-white">
                            Enrollment Growth
                        </h2>

                        <p className="mt-1 text-xs text-white/35">
                            Monthly enrollment activity
                        </p>

                    </div>


                    <div className="h-[300px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={
                                    monthly_enrollments
                                }
                                cursor={false}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.06)"
                                />

                                <XAxis
                                    dataKey="month"
                                    stroke="#777"
                                    fontSize={11}
                                />

                                <YAxis
                                    stroke="#777"
                                    fontSize={11}
                                />

                                <Tooltip
                                    cursor={{
                                        fill: "transparent",
                                    }}
                                    contentStyle={{
                                        backgroundColor:
                                            "#211d35",
                                        border:
                                            "1px solid rgba(255,255,255,0.1)",
                                        borderRadius:
                                            "10px",
                                        color: "#fff",
                                    }}
                                />

                                <Bar
                                    dataKey="enrollments"
                                    fill="#8b5cf6"
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0,
                                    ]}
                                    activeBar={false}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>


            {/* =====================================================
                PLATFORM STATISTICS + ENROLLMENT BREAKDOWN
            ===================================================== */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* =================================================
                    PLATFORM STATISTICS
                ================================================= */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-6">

                    <div className="mb-6">

                        <h2 className="font-semibold text-white">
                            Platform Statistics
                        </h2>

                        <p className="mt-1 text-xs text-white/35">
                            Current platform activity
                        </p>

                    </div>


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* USERS */}

                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">

                            <div className="flex items-center justify-between">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                                    <FaUsers />
                                </div>

                                <span className="text-xs text-white/30">
                                    Latest Month
                                </span>

                            </div>

                            <p className="mt-5 text-sm text-white/40">
                                New Users
                            </p>

                            <p className="mt-1 text-2xl font-bold text-white">
                                {latestUsers}
                            </p>

                        </div>


                        {/* ENROLLMENTS */}

                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">

                            <div className="flex items-center justify-between">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                                    <FaGraduationCap />
                                </div>

                                <span className="text-xs text-white/30">
                                    Latest Month
                                </span>

                            </div>

                            <p className="mt-5 text-sm text-white/40">
                                New Enrollments
                            </p>

                            <p className="mt-1 text-2xl font-bold text-white">
                                {latestEnrollments}
                            </p>

                        </div>


                        {/* PAYMENT SUCCESS */}

                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">

                            <div className="flex items-center justify-between">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
                                    <FaMoneyBillWave />
                                </div>

                                <span className="text-xs text-green-400">
                                    {successPercentage}%
                                </span>

                            </div>

                            <p className="mt-5 text-sm text-white/40">
                                Payment Success Rate
                            </p>

                            <p className="mt-1 text-2xl font-bold text-white">
                                {summary.successful_payments}
                            </p>

                        </div>


                        {/* PAYMENT ISSUES */}

                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">

                            <div className="flex items-center justify-between">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/15 text-yellow-400">
                                    <FaCreditCard />
                                </div>

                                <span className="text-xs text-yellow-400">
                                    Attention
                                </span>

                            </div>

                            <p className="mt-5 text-sm text-white/40">
                                Pending / Failed
                            </p>

                            <p className="mt-1 text-2xl font-bold text-white">
                                {totalPaymentIssues}
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ENROLLMENT BREAKDOWN
                ================================================= */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-6">

                    <div>

                        <h2 className="font-semibold text-white">
                            Enrollment Breakdown
                        </h2>

                        <p className="mt-1 text-xs text-white/35">
                            Free vs paid course enrollments
                        </p>

                    </div>


                    <div className="mt-8 space-y-7">

                        {/* PAID */}

                        <div>

                            <div className="mb-2 flex justify-between">

                                <span className="text-sm text-white/60">
                                    Paid Enrollments
                                </span>

                                <span className="font-semibold text-green-400">
                                    {summary.paid_enrollments}
                                    {" "}
                                    <span className="text-xs text-white/30">
                                        ({paidPercentage}%)
                                    </span>
                                </span>

                            </div>


                            <div className="h-3 overflow-hidden rounded-full bg-white/5">

                                <div
                                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                                    style={{
                                        width: `${paidPercentage}%`,
                                    }}
                                />

                            </div>

                        </div>


                        {/* FREE */}

                        <div>

                            <div className="mb-2 flex justify-between">

                                <span className="text-sm text-white/60">
                                    Free Enrollments
                                </span>

                                <span className="font-semibold text-blue-400">
                                    {summary.free_enrollments}
                                    {" "}
                                    <span className="text-xs text-white/30">
                                        ({freePercentage}%)
                                    </span>
                                </span>

                            </div>


                            <div className="h-3 overflow-hidden rounded-full bg-white/5">

                                <div
                                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                    style={{
                                        width: `${freePercentage}%`,
                                    }}
                                />

                            </div>

                        </div>


                        {/* PAYMENT STATUS */}

                        <div className="grid grid-cols-3 gap-3 pt-3">

                            {/* PAID */}

                            <div className="rounded-xl border border-green-500/10 bg-green-500/10 p-3 text-center">

                                <p className="text-xs text-white/40">
                                    Paid
                                </p>

                                <p className="mt-1 font-bold text-green-400">
                                    {
                                        summary.successful_payments
                                    }
                                </p>

                            </div>


                            {/* PENDING */}

                            <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/10 p-3 text-center">

                                <p className="text-xs text-white/40">
                                    Pending
                                </p>

                                <p className="mt-1 font-bold text-yellow-400">
                                    {
                                        summary.pending_payments
                                    }
                                </p>

                            </div>


                            {/* FAILED */}

                            <div className="rounded-xl border border-red-500/10 bg-red-500/10 p-3 text-center">

                                <p className="text-xs text-white/40">
                                    Failed
                                </p>

                                <p className="mt-1 font-bold text-red-400">
                                    {
                                        summary.failed_payments
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                PAYMENT PERFORMANCE
            ===================================================== */}

            {/* <div className="rounded-2xl border border-white/10 bg-[#171528] p-6">

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h2 className="font-semibold text-white">
                            Payment Performance
                        </h2>

                        <p className="mt-1 text-xs text-white/35">
                            Current payment status overview
                        </p>

                    </div>

                    <FaPercentage className="text-purple-400" />

                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"> */}

                    {/* TOTAL */}
{/* 
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">

                        <p className="text-sm text-white/40">
                            Total Payments
                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">
                            {summary.total_payments}
                        </p>

                    </div> */}


                    {/* SUCCESS */}
{/* 
                    <div className="rounded-xl border border-green-500/10 bg-green-500/[0.04] p-5">

                        <p className="text-sm text-white/40">
                            Successful
                        </p>

                        <p className="mt-2 text-2xl font-bold text-green-400">
                            {summary.successful_payments}
                        </p>

                    </div> */}


                    {/* PENDING */}

                    {/* <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.04] p-5">

                        <p className="text-sm text-white/40">
                            Pending
                        </p>

                        <p className="mt-2 text-2xl font-bold text-yellow-400">
                            {summary.pending_payments}
                        </p>

                    </div> */}


                    {/* FAILED */}
{/* 
                    <div className="rounded-xl border border-red-500/10 bg-red-500/[0.04] p-5">

                        <p className="text-sm text-white/40">
                            Failed
                        </p>

                        <p className="mt-2 text-2xl font-bold text-red-400">
                            {summary.failed_payments}
                        </p>

                    </div>

                </div>

            </div> */}


            {/* =====================================================
                TOP PERFORMING COURSES
            ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171528]">

                {/* HEADER */}

                <div className="border-b border-white/10 p-6">

                    <h2 className="font-semibold text-white">
                        Top Performing Courses
                    </h2>

                    <p className="mt-1 text-xs text-white/35">
                        Courses ranked by enrollment
                    </p>

                </div>


                {/* TABLE */}

                <div className="overflow-x-auto">

                    {/* FIXED HEADER */}

                    <table className="w-full min-w-[700px] table-fixed">

                        <thead className="bg-[#3e3492]">

                            <tr>

                                <th className="w-[55%] px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-white/90">
                                    Course
                                </th>

                                <th className="w-[20%] px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white/90">
                                    Enrollments
                                </th>

                                <th className="w-[25%] px-6 py-4 text-right text-sm font-semibold uppercase tracking-wide text-white/90">
                                    Revenue
                                </th>

                            </tr>

                        </thead>

                    </table>


                    {/* DATA */}

                    <div className="max-h-[200px] overflow-y-auto">

                        <table className="w-full min-w-[700px] table-fixed">

                            <tbody>

                                {top_courses.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={3}
                                            className="px-6 py-10 text-center text-sm text-white/35"
                                        >
                                            No course data available.
                                        </td>

                                    </tr>

                                ) : (

                                    top_courses.map(
                                        (
                                            course,
                                            index
                                        ) => (

                                            <tr
                                                key={
                                                    course.course_id
                                                }
                                                className="border-b border-white/5 last:border-0"
                                            >

                                                {/* COURSE */}

                                                <td className="w-[55%] px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-sm font-bold text-purple-400">
                                                            {
                                                                index +
                                                                1
                                                            }
                                                        </div>

                                                        <span className="truncate font-medium text-white">
                                                            {
                                                                course.course_title
                                                            }
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* ENROLLMENTS */}

                                                <td className="w-[20%] px-6 py-4 text-center text-white/60">

                                                    {
                                                        course.enrollments
                                                    }

                                                </td>


                                                {/* REVENUE */}

                                                <td className="w-[25%] px-6 py-4 text-right font-semibold text-green-400">

                                                    ₹
                                                    {course.revenue.toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminAnalytics;