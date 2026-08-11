import Loader from "../components/common/Loader";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaClock, FaUserGraduate } from "react-icons/fa";
import { getCourses } from "../api/courseApi";

const Courses = () => {


    const loadCourses = async () => {

        try {

            setLoading(true);

            const data = await getCourses(
                search,
                category,
                price
            );

            setCourses(data);
            setFilteredCourses(data);

        } catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };
    const [courses, setCourses] = useState<any[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("latest");

    const [searchParams] = useSearchParams();


    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const price = searchParams.get("price") || "";

    const previewImages = courses
        .slice(0, 3)
        .map(course => course.thumbnail)
        .filter(Boolean);

    useEffect(() => {
        loadCourses();
    }, [search, category, price]);

    useEffect(() => {
        let sorted = [...courses];

        switch (sortBy) {

            case "az":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;

            case "za":
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;

            case "low":
                sorted.sort((a, b) => Number(a.price) - Number(b.price));
                break;

            case "high":
                sorted.sort((a, b) => Number(b.price) - Number(a.price));
                break;

            case "free":
                sorted = sorted.filter(course => Number(course.price) === 0);
                break;

            case "paid":
                sorted = sorted.filter(course => Number(course.price) > 0);
                break;

            default:
                break;
        }

        setFilteredCourses(sorted);

    }, [sortBy, courses]);

    // useEffect(() => {
    //     const filtered = courses.filter((course) =>
    //         course.title.toLowerCase().includes(search.toLowerCase())
    //     );

    //     setFilteredCourses(filtered);
    // }, [search, courses]);
    if (loading) {
        return (
            <Loader
                images={previewImages}
            />
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-gray-100">

            <div className="mx-auto max-w-7xl px-6 py-10">

                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
                    Explore Our Courses
                </h1>

                <p className="mt-2 text-gray-500">
                    Find the perfect course for your career.
                </p>


                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div className="flex gap-2">

                            <h3 className="text-lg font-semibold text-gray-800">
                                Search Results :
                            </h3>

                            <p className="text-lg text-gray-500">
                                {/* Showing{" "} */}
                                <span className="font-semibold text-indigo-600">
                                    {filteredCourses.length}
                                </span>{" "}
                                course{filteredCourses.length !== 1 ? "s" : ""}
                            </p>

                        </div>

                        <div className="flex items-center gap-3">

                            <span className="text-sm font-medium text-gray-600">
                                Sort By
                            </span>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border border-gray-300 px-2 py-2.5 text-sm shadow-sm transition hover:border-indigo-500 focus:border-indigo-600 focus:outline-none"
                            >
                                <option value="latest">Latest</option>
                                <option value="az">A - Z</option>
                                <option value="za">Z - A</option>
                                <option value="low">Price: Low → High</option>
                                <option value="high">Price: High → Low</option>
                                <option value="free">Free</option>
                                <option value="paid">Paid</option>
                            </select>

                        </div>

                    </div>

                </div>

                {/* <input
                    type="text"
                    placeholder="Search Courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-8 w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-indigo-500"
                /> */}

                <div
    className={`mt-10 grid gap-8
        ${
            filteredCourses.length === 1
                ? "grid-cols-1 max-w-md mx-auto"
                : filteredCourses.length === 2
                ? "md:grid-cols-2 max-w-3xl mx-auto"
                : "md:grid-cols-2 lg:grid-cols-3"
        }
    `}
>

                    {filteredCourses.map((course) => (

                        <div
                            key={course.id}
                            className="group overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_60px_rgba(99,102,241,0.35)]"
                        >

                            <div className="relative overflow-hidden">

                                <img
                                    src={
                                        course.thumbnail && course.thumbnail !== ""
                                            ? course.thumbnail
                                            : "https://placehold.co/600x400?text=LearnyFy"
                                    }
                                    alt={course.title}
                                    className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Category */}
                                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1 text-xs font-bold text-indigo-600 shadow-lg">
                                    {course.category}
                                </span>

                                {/* Price */}
                                <span
                                    className={`absolute right-4 top-4 rounded-full px-4 py-1.5 shadow-xl text-xs font-bold ${Number(course.price) === 0
                                        ? "bg-green-500 text-white"
                                        : "bg-indigo-600 text-white"
                                        }`}
                                >
                                    {Number(course.price) === 0 ? "FREE" : `₹${course.price}`}
                                </span>

                            </div>

                            <div className="space-y-4 p-6">

                                <h2 className="line-clamp-2 text-2xl leading-tight font-bold text-gray-800 transition-colors duration-300 group-hover:text-indigo-600">
                                    {course.title}
                                </h2>

                                <p className="mt-3 line-clamp-3 leading-7 text-gray-500">
                                    {course.short_description}
                                </p>

                                <div className="mt-5 flex items-center justify-between">

                                    <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">

                                        <FaUserGraduate className="text-indigo-500" />

                                        <span className="text-sm font-medium">
                                            {course.instructor}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2">

                                        <FaClock className="text-indigo-500" />

                                        <span className="text-sm font-medium">
                                            {course.duration}
                                        </span>

                                    </div>

                                </div>

                                {/* <div className="mt-2 flex items-center justify-between">

                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                                        {course.category}
                                    </span>

                                    <span className="font-bold text-indigo-600">
                                        {Number(course.price) === 0
                                            ? "Free"
                                            : `₹${course.price}`}
                                    </span>

                                </div> */}

                                <Link
                                    to={`/courses/${course.id}`}
                                    className="
        mt-6
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-gradient-to-r
        from-indigo-600
        to-purple-600
        py-3
        font-semibold
        text-white
        transition-all
        duration-300
        hover:shadow-xl
        hover:scale-[1.02]
    "
                                >
                                    View Details
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

                {filteredCourses.length === 0 && (
                    <div className="mt-20 text-center text-2xl text-gray-500">
                        No courses found.
                    </div>
                )}

            </div>

        </div>
    );
};

export default Courses;