import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaUserGraduate,
  FaStar,
} from "react-icons/fa";

interface Props {
  course: {
    id: string;
    title: string;
    thumbnail?: string;
    instructor?: string;
    duration?: string;
    price?: number | string;
    rating?: number | string;
    category?: string;
  };
}

const FloatingCourseCard = ({ course }: Props) => {
  const isFree = Number(course.price) === 0;

  return (
    <motion.div
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      transition={{
        duration: 0.35,
      }}
      className="group w-[340px] shrink-0 overflow-hidden rounded-3xl border border-white/10 m-2 mt-5 shadow-xl"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">

        <img
          src={
            course.thumbnail ||
            "https://placehold.co/600x400?text=LearnyFy"
          }
          alt={course.title}
          className="h-52 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
          {course.category || "Course"}
        </span>

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${
            isFree
              ? "bg-green-500 text-white"
              : "bg-white text-indigo-600"
          }`}
        >
          {isFree
            ? "FREE"
            : `₹${course.price}`}
        </span>

      </div>

      {/* Content */}

      <div className="space-y-4 p-6">

        <h3 className="line-clamp-2 text-xl font-bold text-gray-900 transition group-hover:text-indigo-600">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaUserGraduate className="text-indigo-500" />
          {course.instructor || "LearnyFy"}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaClock className="text-indigo-500" />
          {course.duration || "Self Paced"}
        </div>

        <div className="flex items-center gap-2 text-yellow-500">
          <FaStar />
          {course.rating || "5.0"}
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="mt-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold text-white transition hover:shadow-xl"
        >
          Explore Course →
        </Link>

      </div>
    </motion.div>
  );
};

export default FloatingCourseCard;