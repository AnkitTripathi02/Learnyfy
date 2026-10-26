import { Link } from "react-router-dom";
import {
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";

interface Props {
  course: any;
}

const CourseCardMini = ({ course }: Props) => {
  const isFree = Number(course.price) === 0;

  return (
    <div
      className="
        flex
        h-[470px]
        w-[330px]
        flex-shrink-0
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_25px_60px_rgba(99,102,241,0.25)]
      "
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative h-52 w-full flex-shrink-0 overflow-hidden bg-gray-100">
        <img
          src={
            course.thumbnail ||
            "https://placehold.co/600x350?text=LearnyFy"
          }
          alt={course.title || "Course"}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            hover:scale-110
          "
        />

        {/* IMAGE OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/20
            via-transparent
            to-transparent
          "
        />

        {/* =================================================
            CATEGORY
        ================================================== */}

        <span
          className="
            absolute
            left-4
            top-4
            max-w-[150px]
            truncate
            rounded-full
            bg-white/95
            px-3
            py-1.5
            text-xs
            font-bold
            text-indigo-600
            shadow-sm
            backdrop-blur-sm
          "
        >
          {course.category || "Course"}
        </span>

        {/* =================================================
            PRICE
        ================================================== */}

        <span
          className={`
            absolute
            right-4
            top-4
            rounded-full
            px-3
            py-1.5
            text-xs
            font-bold
            shadow-sm
            ${
              isFree
                ? "bg-green-500 text-white"
                : "bg-indigo-600 text-white"
            }
          `}
        >
          {isFree
            ? "FREE"
            : `₹${Number(course.price).toLocaleString("en-IN")}`}
        </span>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="
        flex
        min-h-0
        flex-1
        flex-col
        p-5
      ">

        {/* =================================================
            TITLE
        ================================================== */}

        <h3
          className="
            min-h-[56px]
            line-clamp-2
            text-xl
            font-bold
            leading-7
            text-gray-900
          "
          title={course.title}
        >
          {course.title || "Untitled Course"}
        </h3>

        {/* =================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            mt-2
            min-h-[40px]
            line-clamp-2
            text-sm
            leading-5
            text-gray-500
          "
          title={course.short_description}
        >
          {course.short_description ||
            "Learn practical skills with this course."}
        </p>

        {/* =================================================
            COURSE META
        ================================================== */}

        <div className="
          mt-5
          grid
          grid-cols-2
          gap-3
        ">

          {/* INSTRUCTOR */}

          <div className="
            flex
            min-w-0
            items-center
            gap-2
            text-sm
            text-gray-500
          ">
            <FaUserGraduate
              className="
                flex-shrink-0
                text-indigo-500
              "
            />

            <span
              className="
                truncate
              "
              title={course.instructor}
            >
              {course.instructor || "Instructor"}
            </span>
          </div>

          {/* DURATION */}

          <div className="
            flex
            min-w-0
            items-center
            justify-end
            gap-2
            text-sm
            text-gray-500
          ">
            <FaClock
              className="
                flex-shrink-0
                text-indigo-500
              "
            />

            <span
              className="
                truncate
              "
              title={course.duration}
            >
              {course.duration || "N/A"}
            </span>
          </div>

        </div>

        {/* =================================================
            PUSH BUTTON TO BOTTOM
        ================================================== */}

        <div className="mt-auto pt-5">

          <Link
            to={`/courses/${course.id}`}
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              py-3
              text-sm
              font-semibold
              text-white
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:from-indigo-500
              hover:to-purple-500
              hover:shadow-lg
              active:translate-y-0
            "
          >
            View Details
            <span className="ml-1.5">
              →
            </span>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default CourseCardMini;