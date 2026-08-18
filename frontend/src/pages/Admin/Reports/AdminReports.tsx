import { useEffect, useMemo, useState } from "react";
import {
    FaRupeeSign,
    FaCreditCard,
    FaUsers,
    FaBookOpen,
    FaDownload,
    FaChartLine,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowUp,
    FaSearch,
    FaCalendarAlt,
} from "react-icons/fa";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
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

type PeriodType =
    | "7days"
    | "30days"
    | "month"
    | "year";

const AdminReports = () => {
    const [data, setData] =
        useState<AnalyticsData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [period, setPeriod] =
        useState<PeriodType>("30days");

    const [search, setSearch] =
        useState("");

    /* =========================================================
       LOAD ANALYTICS
    ========================================================= */

    const loadReports = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await getAnalytics();

            setData(response);
        } catch (err) {
            console.error(
                "Reports error:",
                err
            );

            setError(
                "Unable to load reports."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReports();
    }, []);

    /* =========================================================
       MEMOIZED DATA
    ========================================================= */

    const revenueData = useMemo(() => {
        if (!data) return [];

        return data.monthly_revenue.map(
            (item) => ({
                month: item.month,
                revenue: Number(item.revenue) || 0,
            })
        );
    }, [data]);

    // const growthData = useMemo(() => {
    //     if (!data) return [];

    //     const users =
    //         data.monthly_users || [];

    //     const enrollments =
    //         data.monthly_enrollments || [];

    //     const months = new Set([
    //         ...users.map(
    //             (item) => item.month
    //         ),
    //         ...enrollments.map(
    //             (item) => item.month
    //         ),
    //     ]);

    //     return Array.from(months).map(
    //         (month) => ({
    //             month,
    //             users:
    //                 users.find(
    //                     (item) =>
    //                         item.month ===
    //                         month
    //                 )?.users || 0,
    //             enrollments:
    //                 enrollments.find(
    //                     (item) =>
    //                         item.month ===
    //                         month
    //                 )?.enrollments || 0,
    //         })
    //     );
    // }, [data]);

    const filteredCourses = useMemo(() => {
        if (!data) return [];

        const query =
            search.trim().toLowerCase();

        if (!query) {
            return data.top_courses;
        }

        return data.top_courses.filter(
            (course) =>
                course.course_title
                    .toLowerCase()
                    .includes(query)
        );
    }, [data, search]);

    const paymentData = useMemo(() => {
        if (!data) return [];

        return [
            {
                name: "Successful",
                value:
                    data.summary
                        .successful_payments,
            },
            {
                name: "Pending",
                value:
                    data.summary
                        .pending_payments,
            },
            {
                name: "Failed",
                value:
                    data.summary
                        .failed_payments,
            },
        ].filter(
            (item) => item.value > 0
        );
    }, [data]);

    /* =========================================================
       INSIGHTS
    ========================================================= */

    const totalRevenue =
        data?.summary.total_revenue || 0;

    const totalPayments =
        data?.summary.total_payments || 0;

    const totalEnrollments =
        data?.summary.total_enrollments || 0;

    const successfulPayments =
        data?.summary
            .successful_payments || 0;

    const paymentSuccessRate =
        totalPayments > 0
            ? Math.round(
                  (successfulPayments /
                      totalPayments) *
                      100
              )
            : 0;

    const paidEnrollmentRate =
        totalEnrollments > 0
            ? Math.round(
                  ((data?.summary
                      .paid_enrollments ||
                      0) /
                      totalEnrollments) *
                      100
              )
            : 0;

    const latestUsers =
        data?.monthly_users?.length
            ? data.monthly_users[
                  data.monthly_users.length - 1
              ].users
            : 0;

    const latestEnrollments =
        data?.monthly_enrollments?.length
            ? data.monthly_enrollments[
                  data.monthly_enrollments
                      .length - 1
              ].enrollments
            : 0;

    /* =========================================================
       CSV EXPORT
    ========================================================= */

    const downloadCSV = () => {
        if (!data) return;

        const rows: string[][] = [
            [
                "Course",
                "Enrollments",
                "Revenue",
            ],
            ...filteredCourses.map(
                (course) => [
                    course.course_title,
                    String(
                        course.enrollments
                    ),
                    String(
                        course.revenue
                    ),
                ]
            ),
        ];

        const csvContent = rows
            .map((row) =>
                row
                    .map(
                        (value) =>
                            `"${value.replace(
                                /"/g,
                                '""'
                            )}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "learnyfy-reports.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {
        return (
            <div className="flex min-h-[600px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />

                    <p className="mt-4 text-sm text-white/40">
                        Preparing your reports...
                    </p>
                </div>
            </div>
        );
    }

    /* =========================================================
       ERROR
    ========================================================= */

    if (error || !data) {
        return (
            <div className="flex min-h-[600px] flex-col items-center justify-center">
                <div className="rounded-2xl border border-red-500/10 bg-red-500/5 px-8 py-7 text-center">
                    <FaTimesCircle className="mx-auto text-3xl text-red-400" />

                    <p className="mt-3 text-sm text-red-300">
                        {error ||
                            "Reports unavailable"}
                    </p>

                    <button
                        onClick={
                            loadReports
                        }
                        className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full space-y-6 p-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                            <FaChartLine />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Reports & Analytics
                            </h1>

                            <p className="mt-1 text-sm text-white/40">
                                Understand how LearnyFy is performing.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171528] px-4">

                        <FaCalendarAlt className="text-white/30" />

                        <select
                            value={period}
                            onChange={(e) =>
                                setPeriod(
                                    e.target
                                        .value as PeriodType
                                )
                            }
                            className="bg-transparent py-3 text-sm text-white outline-none"
                        >
                            <option
                                value="7days"
                                className="bg-[#171528]"
                            >
                                Last 7 Days
                            </option>

                            <option
                                value="30days"
                                className="bg-[#171528]"
                            >
                                Last 30 Days
                            </option>

                            <option
                                value="month"
                                className="bg-[#171528]"
                            >
                                This Month
                            </option>

                            <option
                                value="year"
                                className="bg-[#171528]"
                            >
                                This Year
                            </option>
                        </select>

                    </div>

                    <button
                        onClick={
                            downloadCSV
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
                    >
                        <FaDownload />

                        Export Report
                    </button>

                </div>

            </div>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* REVENUE */}

                <div className="group rounded-2xl border border-white/10 bg-[#171528] p-5 transition hover:border-green-500/20">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-white/35">
                                Total Revenue
                            </p>

                            <p className="mt-3 text-2xl font-bold text-white">
                                ₹
                                {totalRevenue.toLocaleString(
                                    "en-IN"
                                )}
                            </p>

                            <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                                <FaArrowUp />

                                <span>
                                    Revenue generated
                                </span>
                            </div>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                            <FaRupeeSign />
                        </div>

                    </div>

                </div>


                {/* ENROLLMENTS */}

                <div className="group rounded-2xl border border-white/10 bg-[#171528] p-5 transition hover:border-purple-500/20">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-white/35">
                                Enrollments
                            </p>

                            <p className="mt-3 text-2xl font-bold text-white">
                                {totalEnrollments.toLocaleString(
                                    "en-IN"
                                )}
                            </p>

                            <div className="mt-2 flex items-center gap-1 text-xs text-purple-400">
                                <FaArrowUp />

                                <span>
                                    {latestEnrollments} latest
                                </span>
                            </div>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                            <FaBookOpen />
                        </div>

                    </div>

                </div>


                {/* USERS */}

                <div className="group rounded-2xl border border-white/10 bg-[#171528] p-5 transition hover:border-blue-500/20">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-white/35">
                                User Activity
                            </p>

                            <p className="mt-3 text-2xl font-bold text-white">
                                {latestUsers.toLocaleString(
                                    "en-IN"
                                )}
                            </p>

                            <div className="mt-2 flex items-center gap-1 text-xs text-blue-400">
                                <FaUsers />

                                <span>
                                    Latest users
                                </span>
                            </div>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                            <FaUsers />
                        </div>

                    </div>

                </div>


                {/* PAYMENT SUCCESS */}

                <div className="group rounded-2xl border border-white/10 bg-[#171528] p-5 transition hover:border-yellow-500/20">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-white/35">
                                Payment Success
                            </p>

                            <p className="mt-3 text-2xl font-bold text-white">
                                {paymentSuccessRate}%
                            </p>

                            <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                                <FaCheckCircle />

                                <span>
                                    {successfulPayments} successful
                                </span>
                            </div>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                            <FaCreditCard />
                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                MAIN ANALYTICS
            ================================================= */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* REVENUE CHART */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-6 xl:col-span-2">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="font-semibold text-white">
                                Revenue Overview
                            </h2>

                            <p className="mt-1 text-xs text-white/35">
                                Monthly revenue performance
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                            <FaChartLine />
                        </div>

                    </div>

                    <div className="mt-6 h-[300px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <AreaChart
                                data={
                                    revenueData
                                }
                            >
                                <defs>
                                    <linearGradient
                                        id="revenueGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#22c55e"
                                            stopOpacity={
                                                0.3
                                            }
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#22c55e"
                                            stopOpacity={
                                                0
                                            }
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.05)"
                                />

                                <XAxis
                                    dataKey="month"
                                    stroke="rgba(255,255,255,0.3)"
                                    fontSize={11}
                                    tickLine={
                                        false
                                    }
                                />

                                <YAxis
                                    stroke="rgba(255,255,255,0.3)"
                                    fontSize={11}
                                    tickLine={
                                        false
                                    }
                                    tickFormatter={(
                                        value
                                    ) =>
                                        `₹${value}`
                                    }
                                />

                                <Tooltip
                                    contentStyle={{
                                        background:
                                            "#211d35",
                                        border:
                                            "1px solid rgba(255,255,255,0.1)",
                                        borderRadius:
                                            "12px",
                                        color: "#fff",
                                    }}
                                    formatter={(
                                        value
                                    ) =>
                                        `₹${Number(
                                            value
                                        ).toLocaleString(
                                            "en-IN"
                                        )}`
                                    }
                                />

                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#22c55e"
                                    strokeWidth={
                                        3
                                    }
                                    fill="url(#revenueGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>

                    </div>

                </div>


                {/* PAYMENT CHART */}

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-6">

                    <div>
                        <h2 className="font-semibold text-white">
                            Payment Status
                        </h2>

                        <p className="mt-1 text-xs text-white/35">
                            Current payment breakdown
                        </p>
                    </div>

                    <div className="relative mt-5 h-[220px]">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <PieChart>
                                <Pie
                                    data={
                                        paymentData
                                    }
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={
                                        62
                                    }
                                    outerRadius={
                                        88
                                    }
                                    paddingAngle={
                                        4
                                    }
                                >
                                    {paymentData.map(
                                        (
                                            entry,
                                            index
                                        ) => (
                                            <Cell
                                                key={
                                                    entry.name
                                                }
                                                fill={
                                                    [
                                                        "#22c55e",
                                                        "#eab308",
                                                        "#ef4444",
                                                    ][
                                                        index
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        background:
                                            "#211d35",
                                        border:
                                            "1px solid rgba(255,255,255,0.1)",
                                        borderRadius:
                                            "12px",
                                        color: "#fff",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                            <span className="text-2xl font-bold text-white">
                                {
                                    paymentSuccessRate
                                }
                                %
                            </span>

                            <span className="text-[10px] uppercase tracking-wide text-white/30">
                                Success
                            </span>

                        </div>

                    </div>

                    <div className="space-y-3">

                        <div className="flex items-center justify-between text-sm">

                            <div className="flex items-center gap-2">

                                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                                <span className="text-white/50">
                                    Successful
                                </span>

                            </div>

                            <span className="font-semibold text-white">
                                {
                                    data.summary
                                        .successful_payments
                                }
                            </span>

                        </div>

                        <div className="flex items-center justify-between text-sm">

                            <div className="flex items-center gap-2">

                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />

                                <span className="text-white/50">
                                    Pending
                                </span>

                            </div>

                            <span className="font-semibold text-white">
                                {
                                    data.summary
                                        .pending_payments
                                }
                            </span>

                        </div>

                        <div className="flex items-center justify-between text-sm">

                            <div className="flex items-center gap-2">

                                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                                <span className="text-white/50">
                                    Failed
                                </span>

                            </div>

                            <span className="font-semibold text-white">
                                {
                                    data.summary
                                        .failed_payments
                                }
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                USER + ENROLLMENT CHART
            ================================================= */}

            {/* <div className="rounded-2xl border border-white/10 bg-[#171528] p-6">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h2 className="font-semibold text-white">
                            User & Enrollment Growth
                        </h2>

                        <p className="mt-1 text-xs text-white/35">
                            Monthly platform activity
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">

                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            <span className="text-white/40">
                                Users
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-purple-500" />
                            <span className="text-white/40">
                                Enrollments
                            </span>
                        </div>

                    </div>

                </div>

                <div className="mt-6 h-[300px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={
                                growthData
                            }
                            barGap={8}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.05)"
                            />

                            <XAxis
                                dataKey="month"
                                stroke="rgba(255,255,255,0.3)"
                                fontSize={11}
                                tickLine={
                                    false
                                }
                            />

                            <YAxis
                                stroke="rgba(255,255,255,0.3)"
                                fontSize={11}
                                tickLine={
                                    false
                                }
                            />

                            <Tooltip
                                contentStyle={{
                                    background:
                                        "#211d35",
                                    border:
                                        "1px solid rgba(255,255,255,0.1)",
                                    borderRadius:
                                        "12px",
                                    color: "#fff",
                                }}
                            />

                            <Legend />

                            <Bar
                                dataKey="users"
                                name="Users"
                                fill="#3b82f6"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0,
                                ]}
                            />

                            <Bar
                                dataKey="enrollments"
                                name="Enrollments"
                                fill="#8b5cf6"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0,
                                ]}
                            />
                        </BarChart>
                    </ResponsiveContainer>

                </div>

            </div> */}


            {/* =================================================
                ENROLLMENT INSIGHTS
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-[#171528] p-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                            <FaCheckCircle />
                        </div>

                        <div>
                            <p className="text-xs text-white/35">
                                Paid Enrollment Rate
                            </p>

                            <p className="mt-1 text-xl font-bold text-white">
                                {paidEnrollmentRate}%
                            </p>
                        </div>

                    </div>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#171528] p-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                            <FaBookOpen />
                        </div>

                        <div>
                            <p className="text-xs text-white/35">
                                Free Enrollments
                            </p>

                            <p className="mt-1 text-xl font-bold text-white">
                                {
                                    data.summary
                                        .free_enrollments
                                }
                            </p>
                        </div>

                    </div>

                </div>


                <div className="rounded-2xl border border-white/10 bg-[#171528] p-5">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                            <FaCreditCard />
                        </div>

                        <div>
                            <p className="text-xs text-white/35">
                                Paid Enrollments
                            </p>

                            <p className="mt-1 text-xl font-bold text-white">
                                {
                                    data.summary
                                        .paid_enrollments
                                }
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                TOP COURSES
            ================================================= */}

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171528]">

                <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h2 className="font-semibold text-white">
                            Top Performing Courses
                        </h2>

                        <p className="mt-1 text-xs text-white/35">
                            Courses ranked by enrollments and revenue
                        </p>
                    </div>

                    <div className="relative w-full md:w-72">

                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/25" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target
                                        .value
                                )
                            }
                            placeholder="Search course..."
                            className="w-full rounded-xl border border-white/10 bg-[#211d35] py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-purple-500"
                        />

                    </div>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead className="bg-[#211d35]">

                            <tr>

                                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-white/35">
                                    Rank
                                </th>

                                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-white/35">
                                    Course
                                </th>

                                <th className="px-6 py-4 text-center text-[11px] font-semibold uppercase tracking-wide text-white/35">
                                    Enrollments
                                </th>

                                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wide text-white/35">
                                    Revenue
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredCourses.length ===
                            0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-12 text-center text-sm text-white/30"
                                    >
                                        No courses found.
                                    </td>
                                </tr>
                            ) : (
                                filteredCourses.map(
                                    (
                                        course,
                                        index
                                    ) => (
                                        <tr
                                            key={
                                                course.course_id
                                            }
                                            className="border-t border-white/5 transition hover:bg-white/[0.02]"
                                        >

                                            <td className="px-6 py-4">

                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-xs font-bold text-purple-400">
                                                    {String(
                                                        index +
                                                            1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>

                                            </td>

                                            <td className="px-6 py-4">

                                                <div>
                                                    <p className="font-medium text-white">
                                                        {
                                                            course.course_title
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-white/25">
                                                        Course performance
                                                    </p>
                                                </div>

                                            </td>

                                            <td className="px-6 py-4 text-center">

                                                <span className="rounded-lg bg-purple-500/10 px-3 py-1.5 text-sm font-medium text-purple-300">
                                                    {
                                                        course.enrollments
                                                    }
                                                </span>

                                            </td>

                                            <td className="px-6 py-4 text-right">

                                                <span className="font-semibold text-green-400">
                                                    ₹
                                                    {Number(
                                                        course.revenue
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </span>

                                            </td>

                                        </tr>
                                    )
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">

                <span>
                    LearnyFy Analytics
                </span>

                <span>
                    Data generated from platform analytics.
                </span>

            </div>

        </div>
    );
};

export default AdminReports;