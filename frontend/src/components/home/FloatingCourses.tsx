import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

import { getCourses } from "../../api/courseApi";
import CourseCardMini from "./CourseCardMini";

const SPEED = 4;

const FloatingCourses = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [showArrows, setShowArrows] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const pauseRef = useRef(false);

    useEffect(() => {
        loadCourses();
    }, []);

    const lastTimeRef = useRef(0);

    const loadCourses = async () => {
        try {
            const data = await getCourses();

            setCourses(
                data.filter((c: any) => c.is_published)
            );
        } catch (err) {
            console.log(err);
        }
    };

useEffect(() => {
    const container = containerRef.current;

    if (!container || courses.length === 0) return;

    let animationId: number;

    const animate = () => {

        if (!pauseRef.current) {

            container.scrollLeft += SPEED;

            if (
                container.scrollLeft >=
                container.scrollWidth / 2
            ) {
                container.scrollLeft = 0;
            }

        }

        animationId = requestAnimationFrame(animate);

    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);

}, [courses]);

    // const scrollLeft = () => {
    //     pauseRef.current = true;

    //     containerRef.current?.scrollBy({
    //         left: -400,
    //         behavior: "smooth",
    //     });

    //     setTimeout(() => {
    //         lastTimeRef.current = performance.now();
    //         pauseRef.current = false;
    //     }, 700);
    // };

    const scrollLeft = () => {

    pauseRef.current = true;

    containerRef.current?.scrollBy({
        left: -420,
        behavior: "smooth",
    });

    setTimeout(() => {

        pauseRef.current = false;

    },600);

};

    // const scrollRight = () => {
    //     pauseRef.current = true;

    //     containerRef.current?.scrollBy({
    //         left: 400,
    //         behavior: "smooth",
    //     });

    //     setTimeout(() => {
    //         lastTimeRef.current = performance.now();
    //         pauseRef.current = false;
    //     }, 700);
    // };

    const scrollRight = () => {

    pauseRef.current = true;

    containerRef.current?.scrollBy({
        left: 420,
        behavior: "smooth",
    });

    setTimeout(() => {

        pauseRef.current = false;

    },600);

};
    return (
        <section
            className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FF] to-white py-20"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            <div className="mb-12 text-center">

                <h2 className="text-5xl font-bold text-gray-900">
                    Explore Trending Courses
                </h2>

                <p className="mt-4 text-lg text-gray-500">
                    Browse our most popular courses.
                </p>

            </div>

            {/* LEFT */}
            <button
                onClick={scrollLeft}
                className={`
    group
    absolute
    left-5
    top-1/2
    -translate-y-1/2
    z-30
    flex
    h-14
    w-14
    items-center
    justify-center
    rounded-full
    border
    border-white/30
    bg-white/20
    backdrop-blur-xl
    shadow-lg
    transition-all
    duration-300
    ${showArrows
                        ? "opacity-100 scale-100"
                        : "opacity-35 scale-95"
                    }
    hover:scale-110
    hover:bg-indigo-600
    hover:border-indigo-500
    hover:text-white
    hover:shadow-[0_0_25px_rgba(99,102,241,.6)]
    active:scale-95
  `}
            >
                <FaChevronLeft
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                />
            </button>

            {/* RIGHT */}
            <button
                onClick={scrollRight}
                className={`
    group
    absolute
    right-5
    top-1/2
    -translate-y-1/2
    z-30
    flex
    h-14
    w-14
    items-center
    justify-center
    rounded-full
    border
    border-white/30
    bg-white/20
    backdrop-blur-xl
    shadow-lg
    transition-all
    duration-300
    ${showArrows
                        ? "opacity-100 scale-100"
                        : "opacity-35 scale-95"
                    }
    hover:scale-110
    hover:bg-indigo-600
    hover:border-indigo-500
    hover:text-white
    hover:shadow-[0_0_25px_rgba(99,102,241,.6)]
    active:scale-95
  `}
            >
                <FaChevronRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
            </button>

            {/* Left Gradient */}


            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div
                    ref={containerRef}
                    className="
            flex
            gap-7
            overflow-x-auto
            px-10
            pb-5
            scroll-smooth
            no-scrollbar
            cursor-grab
            active:cursor-grabbing
          "
                >
                    {[...courses, ...courses].map(
                        (course, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0"
                                onMouseEnter={() => {
                                    pauseRef.current = true;
                                }}

                                onMouseLeave={() => {
                                    lastTimeRef.current = performance.now();
                                    pauseRef.current = false;
                                }}
                            >
                                <CourseCardMini course={course} />
                            </div>
                        )
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default FloatingCourses;