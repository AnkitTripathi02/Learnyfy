import { Link } from "react-router-dom";
import {
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";

interface Props {
  course: any;
}

const CourseCardMini = ({ course }: Props) => {
  return (
    <div
      className="
      w-[330px]
      rounded-3xl
      overflow-hidden
      bg-white
      shadow-xl
      border
      border-gray-100
      transition-all
      duration-500
      hover:-translate-y-3
      hover:shadow-[0_25px_60px_rgba(99,102,241,0.35)]
      "
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">

        <img
          src={
            course.thumbnail ||
            "https://placehold.co/600x350?text=LearnyFy"
          }
          alt={course.title}
          className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          hover:scale-110
          "
        />

        {/* Category */}
        <span
          className="
          absolute
          left-4
          top-4
          rounded-full
          bg-white/90
          px-3
          py-1
          text-xs
          font-bold
          text-indigo-600
          "
        >
          {course.category}
        </span>

        {/* Price */}
        <span
          className={`
          absolute
          right-4
          top-4
          rounded-full
          px-3
          py-1
          text-xs
          font-bold
          ${
            Number(course.price) === 0
              ? "bg-green-500 text-white"
              : "bg-indigo-600 text-white"
          }
          `}
        >
          {Number(course.price) === 0
            ? "FREE"
            : `₹${course.price}`}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        <h3
          className="
          text-xl
          font-bold
          text-gray-900
          line-clamp-2
          "
        >
          {course.title}
        </h3>

        <p
          className="
          mt-2
          text-sm
          text-gray-500
          line-clamp-2
          "
        >
          {course.short_description}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaUserGraduate className="text-indigo-500" />
            {course.instructor}
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaClock className="text-indigo-500" />
            {course.duration}
          </div>

        </div>

        <Link
          to={`/courses/${course.id}`}
          className="
          mt-6
          flex
          justify-center
          rounded-xl
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          py-3
          font-semibold
          text-white
          transition
          hover:scale-105
          "
        >
          View Details →
        </Link>

      </div>
    </div>
  );
};

export default CourseCardMini;