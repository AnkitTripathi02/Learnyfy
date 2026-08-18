import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

interface Props {
    courses: any[];
    onEdit: (course: any) => void;
    onDelete: (id: string) => void;
    onAddCourse: () => void;
}

const CourseTable = ({
    courses,
    onEdit,
    onDelete,
    onAddCourse,
}: Props) => {
    const navigate = useNavigate();

    return (
        <div className="rounded-2xl border border-[#2c2545] bg-[#161122] shadow-lg overflow-hidden">

            <table className="w-full table-fixed">

                {/* HEADER */}
                <thead className="sticky top-0 z-30 bg-gradient-to-r from-[#221a38] to-[#1a142d] backdrop-blur-xl shadow-lg border-b border-purple-500/20">
                    <tr className="table w-full table-fixed text-gray-400">

                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-300 bg-transparent">
                            Course
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-300 bg-transparent">
                            Category
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-300 bg-transparent">
                            Level
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-300 bg-transparent">
                            Price
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-300 bg-transparent">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-300 bg-transparent">
                            Action
                        </th>

                        <th className="w-[5%] px-4 py-4">
                            <button
                                onClick={onAddCourse}
                                title="Add Course"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition hover:scale-110"
                            >
                                <FaPlus size={14} />
                            </button>
                        </th>

                    </tr>
                </thead>

                {/* BODY */}
                <tbody
                    className="block max-h-[622px] overflow-y-auto"
                >
                    {courses.length === 0 ? (
                        <tr className="table w-full table-fixed">
                            <td
                                colSpan={7}
                                className="py-12 text-center text-gray-400"
                            >
                                No courses found.
                            </td>
                        </tr>
                    ) : (
                        courses.map((course) => (
                            //   <tr
                            //     key={course.id}
                            //     className="table w-full table-fixed border-b border-[#2c2545] hover:bg-[#1b1528] transition"
                            //   >
                            <tr
                                key={course.id}
                                className="
    border-b border-[#2d2447]
    hover:bg-[#221b37]
    transition-all duration-200 w-full
  "
                            >

                                <td className="w-[16%] px-5 py-5">

                                    <div className="font-semibold text-white">
                                        {course.title}
                                    </div>

                                    <div className="text-sm text-gray-400">
                                        {course.instructor}
                                    </div>

                                </td>

                                <td className="w-[14%] px-4 py-5 text-gray-300">
                                    {course.category}
                                </td>

                                <td className="w-[17%] px-10 py-5 text-gray-300">
                                    {course.level}
                                </td>

                                <td className="w-[15%] px-8 py-5 font-semibold text-green-400">
                                    ₹{course.price}
                                </td>

                                <td className="w-[15%] px-10 py-5">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${course.is_published
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {course.is_published ? "Published" : "Draft"}
                                    </span>
                                </td>

                                <td className="w-[24%] px-6 py-5 whitespace-nowrap">

                                    <button
                                        onClick={() =>
                                            navigate(`/courses/${course.id}`)
                                        }
                                        className="mr-2 rounded-lg bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => onEdit(course)}
                                        className="mr-2 rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => onDelete(course.id)}
                                        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                </td>

                                <td className="w-[5%]"></td>

                            </tr>
                        ))
                    )}
                </tbody>

            </table>

        </div>
    );
};

export default CourseTable;