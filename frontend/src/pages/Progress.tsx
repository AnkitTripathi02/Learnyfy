import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaBookOpen, FaChartLine } from "react-icons/fa";
import { getMyCourses } from "../api/enrollmentApi";

interface EnrolledCourse {
  course_id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  progress: number;
  is_completed: boolean;
}

const Progress = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user?.id) {
          throw new Error("Please sign in again to view your progress.");
        }

        const response = await getMyCourses(user.id);
        setCourses(response.data);
      } catch (requestError) {
        console.error("Failed to load course progress:", requestError);
        setError("Unable to load your progress. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadProgress();
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-500">Loading your progress...</div>;
  }

  return (
    <div className="min-h-full p-6 text-white sm:p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <FaChartLine />
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Progress</h1>
          <p className="mt-1 text-sm text-gray-400">
            Track your completion across enrolled courses.
          </p>
        </div>
      </div>

      {error ? (
        <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </p>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#141222] p-8 text-center">
          <FaBookOpen className="mx-auto text-3xl text-indigo-400" />
          <p className="mt-4 text-gray-300">You are not enrolled in any courses yet.</p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
          >
            Explore courses
          </button>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.course_id}
              className="rounded-2xl border border-white/10 bg-[#141222] p-5 shadow-lg"
            >
              <h2 className="text-lg font-semibold">{course.title}</h2>
              {course.description && (
                <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                  {course.description}
                </p>
              )}
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {course.is_completed ? "Completed" : "Course progress"}
                </span>
                <span className="font-bold text-indigo-400">{course.progress}%</span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label={`${course.title} progress`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={course.progress}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <button
                onClick={() =>
                  navigate(
                    course.is_completed
                      ? `/dashboard/certificate/${course.course_id}`
                      : `/dashboard/learn/${course.course_id}`
                  )
                }
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
              >
                {course.is_completed ? "View certificate" : "Continue learning"}
                <FaArrowRight />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress;
