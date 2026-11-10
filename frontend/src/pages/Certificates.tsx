import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaCertificate } from "react-icons/fa";
import { getMyCourses } from "../api/enrollmentApi";

interface CompletedCourse {
  course_id: string;
  title: string;
  is_completed: boolean;
  progress: number;
}

const Certificates = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CompletedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user?.id) {
          throw new Error("Please sign in again to view your certificates.");
        }

        const response = await getMyCourses(user.id);
        setCourses(response.data.filter((course: CompletedCourse) => course.is_completed));
      } catch (requestError) {
        console.error("Failed to load certificates:", requestError);
        setError("Unable to load your certificates. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadCertificates();
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-500">Loading your certificates...</div>;
  }

  return (
    <div className="min-h-full p-6 text-white sm:p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
          <FaCertificate />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="mt-1 text-sm text-gray-400">
            Certificates become available after completing every lesson.
          </p>
        </div>
      </div>

      {error ? (
        <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </p>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#141222] p-8 text-center">
          <FaCertificate className="mx-auto text-3xl text-yellow-400" />
          <p className="mt-4 text-gray-300">
            Complete all lessons in a course to unlock its certificate.
          </p>
          <button
            onClick={() => navigate("/dashboard/progress")}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
          >
            View my progress
          </button>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.course_id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-yellow-500/20 bg-[#141222] p-5 shadow-lg"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Course completed
                </p>
                <h2 className="mt-2 text-lg font-semibold">{course.title}</h2>
              </div>
              <button
                onClick={() => navigate(`/dashboard/certificate/${course.course_id}`)}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Open <FaArrowRight />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
