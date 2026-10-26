import { useEffect, useState } from "react";
import { getMyCourses } from "../api/enrollmentApi";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

interface MyCourse {
    id: number;
    course_id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    progress: number;
    is_completed: boolean;
    enrolled_at: string;
    expires_at: string | null;
    days_remaining: number | null;
    access_status: "LIFETIME" | "ACTIVE" | "EXPIRING_SOON" | "EXPIRED";
}

const MyCourses = () => {

    const navigate = useNavigate();

    const [courses, setCourses] = useState<MyCourse[]>([]);
    const [loading, setLoading] = useState(true);

    const { search } = useSearch();

    const filteredCourses = courses.filter((course) =>
        course.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const loadCourses = async () => {

        try {

            const user = localStorage.getItem("user");

            if (!user) {
                return;
            }

            const userData = JSON.parse(user);

            const response = await getMyCourses(
                userData.id
            );

            setCourses(response.data);

        } catch (error) {

            console.error(
                "My courses error",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadCourses();

    }, []);

    // =========================
    // FORMAT EXPIRY DATE
    // =========================

    const formatExpiryDate = (
        date: string | null
    ) => {

        if (!date) {
            return null;
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="flex h-[830px] items-center justify-center text-white">
                Loading...
            </div>
        );

    }

    return (

        <div className="min-h-[830px] p-8 text-white">

            <h1 className="mb-6 text-3xl font-bold">
                My Courses
            </h1>

            {
                filteredCourses.length === 0 ?

                    (
                        <p className="text-gray-400">
                            No enrolled courses found
                        </p>
                    )

                    :

                    (

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {
                                filteredCourses.map((course) => {

                                    const isExpired =
                                        course.access_status === "EXPIRED";

                                    const isExpiringSoon =
                                        course.access_status === "EXPIRING_SOON";

                                    const isLifetime =
                                        course.access_status === "LIFETIME";

                                    return (

                                        <div
                                            key={course.id}
                                            className="
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                border-[#2c2545]
                                                bg-[#161122]
                                                transition-all
                                                duration-300
                                                hover:-translate-y-1
                                                hover:border-purple-500/50
                                                hover:shadow-lg
                                            "
                                        >

                                            {/* =========================
                                                THUMBNAIL
                                            ========================= */}

                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="h-40 w-full object-cover"
                                            />

                                            <div className="p-5">

                                                {/* =========================
                                                    TITLE
                                                ========================= */}

                                                <h2 className="text-xl font-semibold">
                                                    {course.title}
                                                </h2>

                                                {/* =========================
                                                    DESCRIPTION
                                                ========================= */}

                                                <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                                                    {course.description}
                                                </p>

                                                {/* =========================
                                                    ACCESS STATUS
                                                ========================= */}

                                                <div className="mt-4">

                                                    {isLifetime && (

                                                        <div className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                            rounded-lg
                                                            border
                                                            border-purple-500/20
                                                            bg-purple-500/10
                                                            px-3
                                                            py-2
                                                        ">

                                                            <span className="text-sm text-purple-300">
                                                                ♾ Lifetime Access
                                                            </span>

                                                        </div>

                                                    )}

                                                    {course.access_status === "ACTIVE" && (

                                                        <div className="
                                                            rounded-lg
                                                            border
                                                            border-green-500/20
                                                            bg-green-500/10
                                                            px-3
                                                            py-2
                                                        ">

                                                            <div className="flex items-center justify-between">

                                                                <span className="text-sm font-medium text-green-400">
                                                                    ● Active
                                                                </span>

                                                                <span className="text-sm text-gray-300">
                                                                    {course.days_remaining} days left
                                                                </span>

                                                            </div>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                Expires:{" "}
                                                                {formatExpiryDate(
                                                                    course.expires_at
                                                                )}
                                                            </p>

                                                        </div>

                                                    )}

                                                    {isExpiringSoon && (

                                                        <div className="
                                                            rounded-lg
                                                            border
                                                            border-orange-500/20
                                                            bg-orange-500/10
                                                            px-3
                                                            py-2
                                                        ">

                                                            <div className="flex items-center justify-between">

                                                                <span className="text-sm font-medium text-orange-400">
                                                                    ⚠ Expiring Soon
                                                                </span>

                                                                <span className="text-sm text-gray-300">
                                                                    {course.days_remaining} days left
                                                                </span>

                                                            </div>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                Expires:{" "}
                                                                {formatExpiryDate(
                                                                    course.expires_at
                                                                )}
                                                            </p>

                                                        </div>

                                                    )}

                                                    {isExpired && (

                                                        <div className="
                                                            rounded-lg
                                                            border
                                                            border-red-500/20
                                                            bg-red-500/10
                                                            px-3
                                                            py-2
                                                        ">

                                                            <span className="text-sm font-medium text-red-400">
                                                                ● Course Expired
                                                            </span>

                                                            <p className="mt-1 text-xs text-gray-400">
                                                                Your access to this course has expired.
                                                            </p>

                                                        </div>

                                                    )}

                                                </div>

                                                {/* =========================
                                                    CONTINUE BUTTON
                                                ========================= */}

<button
    disabled={isExpired}
    onClick={() =>
        navigate(`/dashboard/learn/${course.course_id}`)
    }
    className={`
        mt-4
        w-full
        rounded-lg
        px-4
        py-2
        font-medium
        transition-all

        ${
            isExpired
                ? "cursor-not-allowed bg-gray-700 text-gray-400"
                : "bg-purple-600 text-white hover:bg-purple-700"
        }
    `}
>
    {isExpired
        ? "Access Expired"
        : "Continue Learning"
    }
</button>

                                            </div>

                                        </div>

                                    );

                                })
                            }

                        </div>

                    )
            }

        </div>

    );

};

export default MyCourses;