import {
  FaBookOpen,
  FaClock,
  FaGlobe,
  FaSignal,
  FaUserGraduate,
} from "react-icons/fa";

interface Props {
  course: any;
  isAdmin: boolean;
  onEnroll: () => void;
}

const CourseInfo = ({
  course,
  isAdmin,
  onEnroll,
}: Props) => {
  return (
    <div className="rounded-3xl bg-[#161122] p-8 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold">
        Course Information
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <div className="flex items-center gap-3">
            <FaBookOpen className="text-indigo-400" />
            <span>Category</span>
          </div>

          <span className="font-semibold">
            {course.category}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <div className="flex items-center gap-3">
            <FaSignal className="text-green-400" />
            <span>Level</span>
          </div>

          <span className="font-semibold">
            {course.level}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <div className="flex items-center gap-3">
            <FaClock className="text-yellow-400" />
            <span>Duration</span>
          </div>

          <span className="font-semibold">
            {course.duration}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <div className="flex items-center gap-3">
            <FaGlobe className="text-blue-400" />
            <span>Language</span>
          </div>

          <span className="font-semibold">
            {course.language}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <div className="flex items-center gap-3">
            <FaUserGraduate className="text-purple-400" />
            <span>Instructor</span>
          </div>

          <span className="font-semibold">
            {course.instructor}
          </span>
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-[#221b33] p-5">

        <p className="text-sm text-gray-400">
          Course Price
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-400">
          {Number(course.price) === 0
            ? "FREE"
            : `₹${course.price}`}
        </h2>

      </div>

      {!isAdmin && (
        <button
          onClick={onEnroll}
          className="mt-8 w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-700"
        >
          Enroll Now
        </button>
      )}

    </div>
  );
};

export default CourseInfo;