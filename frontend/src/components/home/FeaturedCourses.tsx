import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaStar,
  FaUserGraduate,
} from "react-icons/fa";

import { getCourses } from "../../api/courseApi";

interface Course {
  id: string;
  title: string;
  instructor?: string;
  duration?: string;
  price?: number | string;
  thumbnail?: string;
  rating?: number | string;
}

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      const response = await getCourses();

      // Agar API direct array return karti hai
      setCourses(response.filter((course: any) => course.is_published));

      // Agar API { data: [] } return karti hai to isko use karo:
      // setCourses(response.data);

    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold">Featured Courses</h2>

          <p className="mt-8 text-gray-500">
            Loading courses...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="courses"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Featured Courses
          </h2>

          <p className="mt-4 text-gray-500">
            Learn from industry experts and become job ready.
          </p>

        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {courses.map((course) => (

            <div
              key={course.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <img
                src={
                  course.thumbnail
                    ? course.thumbnail
                    : "https://placehold.co/600x350?text=LearnyFy"
                }
                alt={course.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-xl font-bold">
                  {course.title}
                </h3>

                <div className="mt-5 flex items-center gap-2 text-gray-600">
                  <FaUserGraduate />
                  {course.instructor || "LearnyFy"}
                </div>

                <div className="mt-3 flex items-center gap-2 text-gray-600">
                  <FaClock />
                  {course.duration || "Self Paced"}
                </div>

                <div className="mt-3 flex items-center gap-2 text-yellow-500">
                  <FaStar />
                  {course.rating ?? "5.0"}
                </div>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-2xl font-bold text-indigo-600">
                    {Number(course.price) === 0
                      ? "Free"
                      : `₹${Number(course.price).toFixed(0)}`}
                  </span>

                  <Link
                    to={`/courses/${course.id}`}
                    className="rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
                  >
                    View
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedCourses;