import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import { getCourses } from "../../api/courseApi";
import CourseCardMini from "./CourseCardMini";

const SPEED = 4;
const CARD_GAP = 28;

const FloatingCourses = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [showArrows, setShowArrows] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const pauseRef = useRef(false);
    const navigate = useNavigate();

    // =========================================================
    // LOAD COURSES
    // =========================================================

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await getCourses();

                const publishedCourses = data.filter(
                    (course: any) => course.is_published
                );

                setCourses(publishedCourses);
            } catch (error) {
                console.error(
                    "Failed to load courses:",
                    error
                );
            }
        };

        loadCourses();
    }, []);

    // =========================================================
    // CHECK WHETHER COURSES NEED CAROUSEL
    // =========================================================

    useEffect(() => {
        const checkOverflow = () => {
            const container = containerRef.current;

            if (!container || courses.length === 0) {
                return;
            }

            /*
             * Temporarily calculate using ONLY original courses.
             *
             * If original courses fit inside viewport:
             *     isOverflowing = false
             *
             * If they don't fit:
             *     isOverflowing = true
             */

            const originalWidth =
                Array.from(
                    container.children
                ).reduce(
                    (total, child) =>
                        total +
                        (child as HTMLElement)
                            .offsetWidth,
                    0
                ) +
                CARD_GAP *
                Math.max(courses.length - 1, 0);

            const availableWidth =
                container.clientWidth;

            setIsOverflowing(
                originalWidth > availableWidth
            );

            // Reset scroll position when layout changes
            if (
                originalWidth <= availableWidth
            ) {
                container.scrollLeft = 0;
            }
        };

        checkOverflow();

        window.addEventListener(
            "resize",
            checkOverflow
        );

        return () => {
            window.removeEventListener(
                "resize",
                checkOverflow
            );
        };
    }, [courses]);

    // =========================================================
    // AUTO FLOATING
    // =========================================================

    useEffect(() => {
        const container = containerRef.current;

        if (
            !container ||
            courses.length === 0 ||
            !isOverflowing
        ) {
            return;
        }

        let animationId: number;

        const animate = () => {
            if (!pauseRef.current) {
                container.scrollLeft += SPEED;

                /*
                 * Because we render duplicated courses only
                 * when overflow exists, we can safely reset
                 * after the first complete set.
                 */

                if (
                    container.scrollLeft >=
                    container.scrollWidth / 2
                ) {
                    container.scrollLeft = 0;
                }
            }

            animationId =
                requestAnimationFrame(animate);
        };

        animationId =
            requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(
                animationId
            );
        };
    }, [courses, isOverflowing]);

    // =========================================================
    // LEFT
    // =========================================================

    const scrollLeft = () => {
        if (!isOverflowing) {
            return;
        }

        pauseRef.current = true;

        containerRef.current?.scrollBy({
            left: -420,
            behavior: "smooth",
        });

        setTimeout(() => {
            pauseRef.current = false;
        }, 600);
    };

    // =========================================================
    // RIGHT
    // =========================================================

    const scrollRight = () => {
        if (!isOverflowing) {
            return;
        }

        pauseRef.current = true;

        containerRef.current?.scrollBy({
            left: 420,
            behavior: "smooth",
        });

        setTimeout(() => {
            pauseRef.current = false;
        }, 600);
    };

    // =========================================================
    // RENDER COURSES
    // =========================================================

    /*
     * IMPORTANT:
     *
     * If courses fit:
     *
     *     [1] [2] [3] [4]
     *
     * Only original courses.
     *
     * If courses don't fit:
     *
     *     [1] [2] [3] [4] [1] [2] [3] [4]
     *
     * Duplicate only for infinite floating.
     */

    const coursesToRender = isOverflowing
        ? [...courses, ...courses]
        : courses;

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-gradient-to-b
                from-[#F7F9FF]
                to-white
                py-20
            "
            onMouseEnter={() => {
                if (isOverflowing) {
                    setShowArrows(true);
                }
            }}
            onMouseLeave={() => {
                setShowArrows(false);
            }}
        >

            {/* =================================================
    SECTION HEADER
================================================== */}

            <div className="
    mx-auto
    mb-12
    flex
    max-w-7xl
    items-end
    justify-between
    px-6
">
                {/* LEFT */}

                <div>
                    <h2 className="
            text-4xl
            font-bold
            tracking-tight
            text-gray-900
            sm:text-5xl
        ">
                        Explore Trending Courses
                    </h2>

                    <p className="
            mt-3
            text-base
            text-gray-500
            sm:text-lg
        ">
                        Browse our most popular courses.
                    </p>
                </div>

                {/* RIGHT */}

                <button
                    type="button"
                    onClick={() => navigate("/courses")}
                    className="
            hidden
            items-center
            gap-2
            rounded-xl
            border
            border-indigo-200
            bg-white
            px-5
            py-2.5
            text-sm
            font-semibold
            text-indigo-600
            shadow-sm
            transition-all
            duration-300
            hover:border-indigo-500
            hover:bg-indigo-600
            hover:text-white
            hover:shadow-lg
            sm:flex
        "
                >
                    View All Courses

                    <FaChevronRight
                        className="
                text-xs
                transition-transform
                duration-300
                group-hover:translate-x-1
            "
                    />
                </button>
            </div>

            {/* =================================================
                LEFT ARROW
            ================================================== */}

            {isOverflowing && (
                <button
                    type="button"
                    onClick={scrollLeft}
                    className={`
                        group
                        absolute
                        left-5
                        top-1/2
                        z-30
                        flex
                        h-14
                        w-14
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-white/20
                        text-gray-700
                        shadow-lg
                        backdrop-blur-xl
                        transition-all
                        duration-300

                        ${showArrows
                            ? "scale-100 opacity-100"
                            : "scale-95 opacity-35"
                        }

                        hover:scale-110
                        hover:border-indigo-500
                        hover:bg-indigo-600
                        hover:text-white
                        hover:shadow-[0_0_25px_rgba(99,102,241,.6)]
                        active:scale-95
                    `}
                >
                    <FaChevronLeft
                        size={18}
                        className="
                            transition-transform
                            duration-300
                            group-hover:-translate-x-1
                        "
                    />
                </button>
            )}

            {/* =================================================
                RIGHT ARROW
            ================================================== */}

            {isOverflowing && (
                <button
                    type="button"
                    onClick={scrollRight}
                    className={`
                        group
                        absolute
                        right-5
                        top-1/2
                        z-30
                        flex
                        h-14
                        w-14
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-white/20
                        text-gray-700
                        shadow-lg
                        backdrop-blur-xl
                        transition-all
                        duration-300

                        ${showArrows
                            ? "scale-100 opacity-100"
                            : "scale-95 opacity-35"
                        }

                        hover:scale-110
                        hover:border-indigo-500
                        hover:bg-indigo-600
                        hover:text-white
                        hover:shadow-[0_0_25px_rgba(99,102,241,.6)]
                        active:scale-95
                    `}
                >
                    <FaChevronRight
                        size={18}
                        className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                        "
                    />
                </button>
            )}

            {/* =================================================
                COURSES
            ================================================== */}

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div
                    ref={containerRef}
                    className={`
                        flex
                        gap-7
                        pb-5
                        px-10
                        no-scrollbar

                        ${isOverflowing
                            ? `
                                    overflow-x-auto
                                    scroll-smooth
                                    cursor-grab
                                    active:cursor-grabbing
                                `
                            : `
                                    justify-center
                                    overflow-hidden
                                `
                        }
                    `}
                >
                    {coursesToRender.map(
                        (course, index) => (
                            <div
                                key={`${course.id}-${index}`}
                                className="
                                    flex-shrink-0
                                "
                                onMouseEnter={() => {
                                    if (
                                        isOverflowing
                                    ) {
                                        pauseRef.current =
                                            true;
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (
                                        isOverflowing
                                    ) {
                                        pauseRef.current =
                                            false;
                                    }
                                }}
                            >
                                <CourseCardMini
                                    course={course}
                                />
                            </div>
                        )
                    )}
                </div>
            </motion.div>

            {/* =================================================
                NO COURSES
            ================================================== */}

            {courses.length === 0 && (
                <div className="
                    py-10
                    text-center
                    text-gray-500
                ">
                    No courses available.
                </div>
            )}

        </section>
    );
};

export default FloatingCourses;