import { FaStar, FaUserGraduate, FaClock } from "react-icons/fa";

interface Props {
  course: any;
}

const CourseHero = ({ course }: Props) => {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#161122] shadow-xl">

      <img
        src={
          course.thumbnail ||
          "https://placehold.co/1200x500?text=LearnyFy"
        }
        alt={course.title}
        className="h-[380px] w-full object-cover"
      />

      <div className="p-8">

        <div className="flex flex-wrap items-center gap-3">

          <span className="rounded-full bg-indigo-600 px-4 py-1 text-sm">
            {course.category}
          </span>

          <span className="rounded-full bg-green-600 px-4 py-1 text-sm">
            {course.level}
          </span>

        </div>

        <h1 className="mt-5 text-4xl font-bold">
          {course.title}
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          {course.short_description}
        </p>

        <div className="mt-8 flex flex-wrap gap-8 text-gray-300">

          <div className="flex items-center gap-2">
            <FaUserGraduate />
            <span>{course.instructor}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaClock />
            <span>{course.duration}</span>
          </div>

          <div className="flex items-center gap-2 text-yellow-400">
            <FaStar />
            <span>4.8 Rating</span>
          </div>

        </div>

      </div>

    </section>
  );
};

export default CourseHero;