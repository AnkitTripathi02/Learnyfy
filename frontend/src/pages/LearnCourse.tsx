import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import {
    FaArrowLeft,
    FaArrowRight,
    FaBookOpen,
    FaCheckCircle,
    FaChevronDown,
    FaChevronRight,
    FaClock,
    FaHome,
    FaLayerGroup,
    FaPlay,
    FaPlayCircle,
    FaRedo,
} from "react-icons/fa";
import {
    completeLesson,
    getCourseProgress,
} from "../api/lessonProgressApi";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

import { getCourseById } from "../api/courseApi";
import { getModules } from "../api/moduleApi";
import { getLessons } from "../api/lessonApi";


const LearnCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const [course, setCourse] = useState<any>(null);
    const [modules, setModules] = useState<any[]>([]);
    const [lessons, setLessons] = useState<Record<string, any[]>>({});
    const [selectedLesson, setSelectedLesson] = useState<any>(null);

    const [openModules, setOpenModules] = useState<
        Record<string, boolean>
    >({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState<number | null>(null);
    const [courseProgress, setCourseProgress] =
        useState<any>(null);

    const [completedLessons, setCompletedLessons] =
        useState<string[]>([]);

    //    LOAD COURSE


    useEffect(() => {
        loadCourse();
    }, [id]);

    useEffect(() => {

        if (countdown === null) return;

        if (countdown === 0) {

            setCountdown(null);

            goToNextLesson();

            return;
        }

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [countdown]);

    const loadCourse = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError("");

            /* Course */
            const courseData = await getCourseById(id);

            /* Modules */
            const moduleData = await getModules(id);

            /* Lessons - load in parallel */
            const lessonResults = await Promise.all(
                moduleData.map(async (module: any) => {
                    try {
                        const lessonData = await getLessons(module.id);

                        return {
                            moduleId: module.id,
                            lessons: lessonData || [],
                        };
                    } catch (lessonError) {
                        console.error(
                            `Failed to load lessons for module ${module.id}`,
                            lessonError
                        );

                        return {
                            moduleId: module.id,
                            lessons: [],
                        };
                    }
                })
            );

            const lessonMap: Record<string, any[]> = {};

            lessonResults.forEach((item) => {
                lessonMap[item.moduleId] = item.lessons;
            });

            /* First lesson */
            let firstLesson: any = null;

            for (const module of moduleData) {
                const moduleLessons =
                    lessonMap[module.id] || [];

                if (moduleLessons.length > 0) {
                    firstLesson = {
                        ...moduleLessons[0],
                        moduleId: module.id,
                    };

                    break;
                }
            }

            /* Initial module state */
            const initialOpenState: Record<string, boolean> = {};

            moduleData.forEach(
                (module: any, index: number) => {
                    initialOpenState[module.id] = index === 0;
                }
            );

            /* Set state */
            setCourse(courseData);
            setModules(moduleData);
            setLessons(lessonMap);
            setOpenModules(initialOpenState);

            if (user?.id) {
                try {
                    const progress = await getCourseProgress(id, user.id);

                    setCourseProgress(progress);

                    setCompletedLessons(
                        progress.completed_lesson_list?.map(
                            (lesson: any) => String(lesson.lesson_id)
                        ) || []
                    );

                } catch (err) {
                    console.log(err);
                }
            }
            if (firstLesson) {
                setSelectedLesson(firstLesson);
            } else {
                setSelectedLesson(null);
            }
        } catch (err) {
            console.error("LearnCourse Error:", err);

            setError(
                "Unable to load this course. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    //    YOUTUBE EMBED URL


    const getEmbedUrl = (url: string) => {
        if (!url) return "";

        try {
            const parsedUrl = new URL(url);

            /* youtube.com/watch?v= */
            if (
                parsedUrl.hostname.includes("youtube.com")
            ) {
                const videoId =
                    parsedUrl.searchParams.get("v");

                if (videoId) {
                    return `https://www.youtube.com/embed/${videoId}`;
                }
            }

            /* youtu.be/videoId */
            if (
                parsedUrl.hostname.includes("youtu.be")
            ) {
                const videoId =
                    parsedUrl.pathname.replace("/", "");

                if (videoId) {
                    return `https://www.youtube.com/embed/${videoId}`;
                }
            }

            /* Already embed URL */
            return url;
        } catch {
            return url;
        }
    };


    //    ALL LESSONS


    const allLessons = useMemo(() => {
        return modules.flatMap((module) =>
            (lessons[module.id] || []).map(
                (lesson) => ({
                    ...lesson,
                    moduleId: module.id,
                })
            )
        );
    }, [modules, lessons]);


    //    CURRENT LESSON


    const currentLessonIndex =
        allLessons.findIndex(
            (lesson) =>
                lesson.id === selectedLesson?.id
        );


    //    CURRENT PROGRESS


    const progress = courseProgress?.progress_percentage ?? 0;

    //    CURRENT MODULE


    const currentModule = modules.find(
        (module) =>
            module.id === selectedLesson?.moduleId
    );


    //    SELECT LESSON


    const selectLesson = (
        lesson: any,
        moduleId: string
    ) => {
        setSelectedLesson({
            ...lesson,
            moduleId,
        });

        /* Automatically open selected module */
        setOpenModules((prev) => ({
            ...prev,
            [moduleId]: true,
        }));

        /* Scroll to top */
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /* ============================================================
       PREVIOUS LESSON
    ============================================================ */

    const handlePrevious = () => {
        if (currentLessonIndex <= 0) return;

        const previousLesson =
            allLessons[currentLessonIndex - 1];

        selectLesson(
            previousLesson,
            previousLesson.moduleId
        );
    };

    /* ============================================================
       NEXT LESSON
    ============================================================ */

    const handleNext = () => {
        if (
            currentLessonIndex < 0 ||
            currentLessonIndex >=
            allLessons.length - 1
        ) {
            return;
        }

        const nextLesson =
            allLessons[currentLessonIndex + 1];

        selectLesson(
            nextLesson,
            nextLesson.moduleId
        );
    };

    /* ============================================================
       TOGGLE MODULE
    ============================================================ */

    const toggleModule = (moduleId: string) => {
        setOpenModules((prev) => ({
            ...prev,
            [moduleId]: !prev[moduleId],
        }));
    };

    const handleLessonComplete = async () => {

        if (!selectedLesson) return;

        try {

            await completeLesson(
                id!,
                selectedLesson.id,
                user.id
            );

            const progress =
                await getCourseProgress(
                    id!,
                    user.id
                );

            setCourseProgress(progress);

            setCompletedLessons(
                progress.completed_lesson_list?.map(
                    (lesson: any) => String(lesson.lesson_id)
                ) || []
            );
        } catch (err) {
            console.log(err);
        }

    };

    const handleVideoEnd = async () => {
  console.log("VIDEO ENDED");
        if (!selectedLesson) return;

        // already completed
        if (completedLessons.includes(String(selectedLesson.id))) {
            goToNextLesson();
            return;
        }

        try {

            await completeLesson(
                id!,
                selectedLesson.id,
                user.id
            );

            const progress = await getCourseProgress(
                id!,
                user.id
            );

            setCourseProgress(progress);
            setCompletedLessons(
                progress.completed_lesson_list?.map(
                    (lesson: any) => String(lesson.lesson_id)
                ) || []
            );

            setCountdown(3);

        } catch (err) {
            console.log(err);
        }

    };

    const goToNextLesson = () => {
        if (
            currentLessonIndex < 0 ||
            currentLessonIndex >= allLessons.length - 1
        ) {
            // Last lesson completed
            navigate(`/certificate/${id}`);
            return;
        }

        const nextLesson = allLessons[currentLessonIndex + 1];

        selectLesson(nextLesson, nextLesson.moduleId);
    };

    /* ============================================================
       NAVIGATION
    ============================================================ */

    const goHome = () => {
        navigate("/");
    };

    const goCourses = () => {
        navigate("/courses");
    };

    /* ============================================================
       LOADING
    ============================================================ */

    if (loading) {
        return (
            <>
                <Navbar />

                <main className="flex min-h-screen items-center justify-center bg-[#07070c] px-6 text-white">
                    <div className="text-center">

                        <div className="relative mx-auto h-20 w-20">

                            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10" />

                            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500" />

                            <div className="absolute inset-3 flex items-center justify-center rounded-full bg-indigo-500/10">
                                <FaBookOpen className="text-xl text-indigo-400" />
                            </div>

                        </div>

                        <h2 className="mt-7 text-lg font-bold">
                            Preparing your learning space
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Loading course content...
                        </p>

                    </div>
                </main>
            </>
        );
    }

    /* ============================================================
       ERROR
    ============================================================ */

    if (error || !course) {
        return (
            <>
                <Navbar />

                <main className="flex min-h-screen items-center justify-center bg-[#07070c] px-6 text-white">

                    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center shadow-2xl">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                            <FaRedo />
                        </div>

                        <h2 className="mt-6 text-2xl font-black">
                            Course unavailable
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {error ||
                                "The requested course could not be found."}
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

                            <button
                                onClick={loadCourse}
                                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                            >
                                Try Again
                            </button>

                            <button
                                onClick={goCourses}
                                className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-bold text-gray-300 transition hover:bg-white/[0.08]"
                            >
                                Browse Courses
                            </button>

                        </div>

                    </div>

                </main>

                <Footer />
            </>
        );
    }

    /* ============================================================
       MAIN UI
    ============================================================ */

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[#07070c] pt-20 text-white">

                {/* =================================================
                    COURSE HEADER
                ================================================== */}

                <section className="border-b border-white/10 bg-gradient-to-b from-[#11101d] via-[#0c0b14] to-[#07070c]">

                    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">

                        {/* ================= BREADCRUMB ================= */}

                        <div className="mb-7 flex flex-wrap items-center gap-2 text-xs">

                            {/* LearnyFy */}

                            <button
                                onClick={goHome}
                                className="flex items-center gap-2 text-gray-500 transition hover:text-white"
                            >
                                <FaHome />

                                <span>
                                    LearnyFy
                                </span>
                            </button>

                            <FaChevronRight className="text-[8px] text-gray-700" />

                            {/* Learning */}

                            <button
                                onClick={goCourses}
                                className="font-medium text-gray-500 transition hover:text-indigo-400"
                            >
                                Explore Course
                            </button>

                            <FaChevronRight className="text-[8px] text-gray-700" />

                            {/* Current course */}

                            <span className="max-w-[220px] truncate font-semibold text-gray-300">
                                {course.title}
                            </span>

                        </div>

                        {/* ================= HEADER ================= */}

                        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">

                            {/* LEFT */}

                            <div>

                                <div className="flex flex-wrap items-center gap-2">

                                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                                        <FaBookOpen />
                                        Learning Course
                                    </span>

                                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-gray-400">
                                        {modules.length} Modules
                                    </span>

                                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-gray-400">
                                        {allLessons.length} Lessons
                                    </span>

                                </div>

                                <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                    {course.title}
                                </h1>

                                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:text-base">
                                    {course.short_description ||
                                        course.description ||
                                        "Master practical skills through structured lessons and hands-on learning."}
                                </p>

                            </div>

                            {/* RIGHT PROGRESS */}

                            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-xl">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                            Course Progress
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-gray-200">
                                            Lesson{" "}
                                            {currentLessonIndex >= 0
                                                ? currentLessonIndex + 1
                                                : 0}{" "}
                                            of{" "}
                                            {allLessons.length}
                                        </p>
                                    </div>

                                    <div className="text-2xl font-black text-indigo-400">
                                        {progress}%
                                    </div>

                                </div>

                                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />

                                </div>

                                <p className="mt-3 text-[11px] text-gray-600">
                                    Keep learning and complete the course.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                    CONTENT
                ================================================== */}

                <section className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[340px_1fr] lg:px-8">

                    {/* =================================================
                        SIDEBAR
                    ================================================== */}

                    <aside className="h-fit lg:sticky lg:top-24">

                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c13] shadow-2xl">

                            {/* Sidebar Header */}

                            <div className="border-b border-white/10 p-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                                            Course Content
                                        </p>

                                        <h2 className="mt-1 text-lg font-bold">
                                            Learning Path
                                        </h2>

                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                                        <FaLayerGroup />
                                    </div>

                                </div>

                                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">

                                    <FaPlayCircle />

                                    <span>
                                        {allLessons.length} lessons
                                    </span>

                                    <span>•</span>

                                    <span>
                                        {modules.length} modules
                                    </span>

                                </div>

                            </div>

                            {/* Modules */}

                            <div className="max-h-[68vh] overflow-y-auto p-3">

                                {modules.length === 0 ? (

                                    <div className="p-8 text-center">

                                        <FaLayerGroup className="mx-auto text-3xl text-gray-700" />

                                        <p className="mt-4 text-sm text-gray-500">
                                            No modules available.
                                        </p>

                                    </div>

                                ) : (

                                    modules.map(
                                        (
                                            module,
                                            moduleIndex
                                        ) => {

                                            const moduleLessons =
                                                lessons[module.id] ||
                                                [];

                                            const isOpen =
                                                !!openModules[
                                                module.id
                                                ];

                                            const containsCurrent =
                                                moduleLessons.some(
                                                    (lesson) =>
                                                        lesson.id ===
                                                        selectedLesson?.id
                                                );

                                            return (
                                                <div
                                                    key={
                                                        module.id
                                                    }
                                                    className="mb-2 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015]"
                                                >

                                                    {/* Module header */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleModule(
                                                                module.id
                                                            )
                                                        }
                                                        className={`flex w-full items-center justify-between p-4 text-left transition ${containsCurrent
                                                            ? "bg-indigo-500/[0.07]"
                                                            : "hover:bg-white/[0.04]"
                                                            }`}
                                                    >

                                                        <div className="flex min-w-0 items-center gap-3">

                                                            <div
                                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${containsCurrent
                                                                    ? "bg-indigo-600 text-white"
                                                                    : "bg-white/[0.06] text-gray-500"
                                                                    }`}
                                                            >
                                                                {moduleIndex +
                                                                    1}
                                                            </div>

                                                            <div className="min-w-0">

                                                                <p className="truncate text-sm font-bold text-gray-200">
                                                                    {
                                                                        module.title
                                                                    }
                                                                </p>

                                                                <p className="mt-1 text-[10px] text-gray-600">
                                                                    {
                                                                        moduleLessons.length
                                                                    }{" "}
                                                                    lessons
                                                                </p>

                                                            </div>

                                                        </div>

                                                        <FaChevronDown
                                                            className={`shrink-0 text-xs transition-transform duration-300 ${isOpen
                                                                ? "rotate-180 text-indigo-400"
                                                                : "text-gray-600"
                                                                }`}
                                                        />

                                                    </button>

                                                    {/* Lessons */}

                                                    {isOpen && (

                                                        <div className="border-t border-white/[0.06] p-2">

                                                            {moduleLessons.length ===
                                                                0 ? (

                                                                <div className="px-3 py-5 text-center text-xs text-gray-600">
                                                                    No lessons in this module.
                                                                </div>

                                                            ) : (

                                                                <div className="space-y-1">

                                                                    {moduleLessons.map(
                                                                        (
                                                                            lesson,
                                                                            lessonIndex
                                                                        ) => {

                                                                            const active =
                                                                                selectedLesson?.id ===
                                                                                lesson.id;

                                                                            return (
                                                                                <button
                                                                                    type="button"
                                                                                    key={
                                                                                        lesson.id
                                                                                    }
                                                                                    onClick={() =>
                                                                                        selectLesson(
                                                                                            lesson,
                                                                                            module.id
                                                                                        )
                                                                                    }
                                                                                    className={`group relative flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${active
                                                                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-950/30"
                                                                                        : "hover:bg-white/[0.05]"
                                                                                        }`}
                                                                                >

                                                                                    {/* Active indicator */}

                                                                                    {active && (
                                                                                        <span className="absolute left-0 top-2 h-[calc(100%-16px)] w-1 rounded-r-full bg-white" />
                                                                                    )}

                                                                                    {/* Lesson number */}

                                                                                    <div
                                                                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-black ${active
                                                                                            ? "bg-white/15 text-white"
                                                                                            : "bg-white/[0.05] text-gray-600"
                                                                                            }`}
                                                                                    >
                                                                                        {completedLessons.includes(
                                                                                            lesson.id
                                                                                        ) ? (
                                                                                            <FaCheckCircle className="text-green-400" />
                                                                                        ) : active ? (
                                                                                            <FaPlay className="text-[8px]" />
                                                                                        ) : (
                                                                                            lessonIndex + 1
                                                                                        )}
                                                                                    </div>

                                                                                    {/* Lesson info */}

                                                                                    <div className="min-w-0 flex-1">

                                                                                        <p
                                                                                            className={`truncate text-sm font-semibold ${active
                                                                                                ? "text-white"
                                                                                                : "text-gray-400 group-hover:text-gray-200"
                                                                                                }`}
                                                                                        >
                                                                                            {
                                                                                                lesson.title
                                                                                            }
                                                                                        </p>

                                                                                        <div
                                                                                            className={`mt-1 flex items-center gap-1.5 text-[10px] ${active
                                                                                                ? "text-white/60"
                                                                                                : "text-gray-600"
                                                                                                }`}
                                                                                        >
                                                                                            <FaClock />

                                                                                            <span>
                                                                                                {lesson.duration ||
                                                                                                    "Lesson"}
                                                                                            </span>
                                                                                        </div>

                                                                                    </div>

                                                                                    {active && (
                                                                                        <FaChevronRight className="shrink-0 text-[10px] text-white/60" />
                                                                                    )}

                                                                                </button>
                                                                            );
                                                                        }
                                                                    )}

                                                                </div>

                                                            )}

                                                        </div>

                                                    )}

                                                </div>
                                            );
                                        }
                                    )

                                )}

                            </div>

                        </div>

                    </aside>

                    {/* =================================================
                        MAIN LESSON
                    ================================================== */}

                    <div className="min-w-0">

                        {selectedLesson ? (

                            <div>

                                {/* ================= VIDEO ================= */}

                                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl">

                                    {/* Video badge */}

                                    <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-2 text-[10px] font-bold backdrop-blur-xl">

                                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                                        Lesson{" "}
                                        {currentLessonIndex + 1}{" "}
                                        /{" "}
                                        {allLessons.length}

                                    </div>

                                    {countdown !== null && (
                                        <div className="absolute bottom-5 right-5 z-20 rounded-xl bg-green-600 px-5 py-3 text-white shadow-xl">
                                            <p className="text-sm font-semibold">
                                                Lesson Completed ✅
                                            </p>

                                            <p className="text-xs">
                                                Next lesson starts in {countdown}s...
                                            </p>
                                        </div>
                                    )}

                                    {selectedLesson.video_url ? (

                                        // <iframe
                                        //     className="aspect-video w-full"
                                        //     src={getEmbedUrl(
                                        //         selectedLesson.video_url
                                        //     )}
                                        //     title={
                                        //         selectedLesson.title
                                        //     }
                                        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        //     allowFullScreen
                                        // />
                                        <YouTube
                                            videoId={getEmbedUrl(selectedLesson.video_url).split("/embed/")[1]}
                                            opts={{
                                                width: "100%",
                                                height: "650",
                                                playerVars: {
                                                    autoplay: 0,
                                                },
                                            }}
                                            onEnd={handleVideoEnd}
                                        />

                                    ) : (

                                        <div className="flex aspect-video items-center justify-center">

                                            <div className="text-center">

                                                <FaPlayCircle className="mx-auto text-5xl text-gray-700" />

                                                <p className="mt-4 text-sm text-gray-500">
                                                    Video not available for this lesson.
                                                </p>

                                            </div>

                                        </div>

                                    )}

                                </div>

                                {/* ================= LESSON INFO ================= */}

                                <div className="mt-7">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <span className="rounded-full bg-indigo-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-400">
                                            Current Lesson
                                        </span>

                                        {selectedLesson.is_preview && (
                                            <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                                                Free Preview
                                            </span>
                                        )}

                                        {currentModule && (
                                            <span className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <FaChevronRight className="text-[8px]" />

                                                {
                                                    currentModule.title
                                                }
                                            </span>
                                        )}

                                    </div>

                                    <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                                        {selectedLesson.title}
                                    </h2>

                                    <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-400 sm:text-base">
                                        {selectedLesson.description ||
                                            "Continue this lesson to strengthen your understanding and build practical skills."}
                                    </p>

                                </div>

                                {/* ================= DETAILS ================= */}

                                <div className="mt-7 grid gap-4 sm:grid-cols-2">

                                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:bg-white/[0.04]">

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                                                <FaClock />
                                            </div>

                                            <div>

                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                                                    Duration
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-gray-200">
                                                    {selectedLesson.duration ||
                                                        "Not specified"}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:bg-white/[0.04]">

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                                                <FaCheckCircle />
                                            </div>

                                            <div>

                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                                                    Lesson Status
                                                </p>
                                                <p className="mt-1 text-sm font-bold text-gray-200">
                                                    {completedLessons.includes(
                                                        selectedLesson.id
                                                    )
                                                        ? "Completed"
                                                        : "Not Completed"}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="mt-8">

                                    {!completedLessons.includes(
                                        selectedLesson.id
                                    ) && (

                                            <button
                                                onClick={handleLessonComplete}
                                                disabled={completedLessons.includes(String(selectedLesson.id))}
                                                className="rounded-xl bg-green-600 px-6 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
                                            >
                                                {completedLessons.includes(String(selectedLesson.id))
                                                    ? "Completed ✅"
                                                    : "Mark as Completed"}
                                            </button>

                                        )}

                                </div>

                                {/* ================= NAVIGATION ================= */}

                                <div className="mt-8 border-t border-white/10 pt-6">

                                    <div className="grid gap-3 sm:grid-cols-2">

                                        {/* Previous */}

                                        <button
                                            type="button"
                                            onClick={
                                                handlePrevious
                                            }
                                            disabled={
                                                currentLessonIndex <=
                                                0
                                            }
                                            className="group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm font-bold text-gray-300 transition-all hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-20"
                                        >
                                            <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />

                                            <span>
                                                Previous Lesson
                                            </span>
                                        </button>

                                        {/* Next */}

                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            disabled={
                                                currentLessonIndex <
                                                0 ||
                                                currentLessonIndex >=
                                                allLessons.length -
                                                1
                                            }
                                            className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition-all hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-20"
                                        >
                                            <span>
                                                Next Lesson
                                            </span>

                                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                        </button>

                                    </div>

                                    {/* Up next */}

                                    {currentLessonIndex >= 0 &&
                                        currentLessonIndex <
                                        allLessons.length -
                                        1 && (

                                            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">

                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                                                    Up Next
                                                </p>

                                                <div className="mt-1 flex items-center justify-between gap-4">

                                                    <p className="truncate text-sm font-semibold text-gray-400">
                                                        {
                                                            allLessons[
                                                                currentLessonIndex +
                                                                1
                                                            ].title
                                                        }
                                                    </p>

                                                    <FaArrowRight className="shrink-0 text-xs text-indigo-400" />

                                                </div>

                                            </div>

                                        )}

                                </div>

                            </div>

                        ) : (

                            /* ================= EMPTY ================= */

                            <div className="flex min-h-[550px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.025]">

                                <div className="px-6 text-center">

                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-400">
                                        <FaBookOpen />
                                    </div>

                                    <h2 className="mt-6 text-2xl font-black">
                                        No Lessons Available
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                        This course does not have any lessons yet. Check back later for new learning content.
                                    </p>

                                    <button
                                        onClick={goCourses}
                                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold transition hover:bg-indigo-500"
                                    >
                                        <FaArrowLeft />
                                        Browse Courses
                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
};

export default LearnCourse;