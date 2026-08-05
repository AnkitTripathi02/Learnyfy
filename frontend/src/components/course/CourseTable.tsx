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
        <div className="overflow-hidden rounded-2xl border border-[#2c2545] bg-[#161122] shadow-lg">

            <table className="w-full">

                <thead>
                    <tr className="border-b border-[#2c2545] dark:text-gray-400">

                        <th className="px-6 py-4 text-left">
                            Course
                        </th>

                        <th className="px-6 py-4 text-left">
                            Category
                        </th>

                        <th className="px-6 py-4 text-left">
                            Level
                        </th>

                        <th className="px-6 py-4 text-left">
                            Price
                        </th>

                        <th className="px-6 py-4 text-left">
                            Status
                        </th>

                        <th className="px-6 py-4">

                            <span>Action</span>
                        </th>
                        <th>
                            <button
                                onClick={onAddCourse}
                                title="Add Course"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition-all duration-200 hover:scale-110 hover:shadow-lg"
                            >
                                <FaPlus size={14} />
                            </button>
                        </th>

                    </tr>
                </thead>

                <tbody>

                    {courses.length === 0 ? (

                        <tr>

                            <td
                                colSpan={6}
                                className="py-12 text-center text-gray-400"
                            >
                                No courses found.
                            </td>

                        </tr>

                    ) : (

                        courses.map((course) => (

                            <tr
                                key={course.id}
                                className="border-t border-[#2c2545] hover:bg-[#1b1528] transition"
                            >

                                <td className="px-6 py-5">

                                    <div className="font-semibold text-white">
                                        {course.title}
                                    </div>

                                    <div className="text-sm text-gray-400">
                                        {course.instructor}
                                    </div>

                                </td>

                                <td className="px-6 py-5 text-gray-300">
                                    {course.category}
                                </td>

                                <td className="px-6 py-5 text-gray-300">
                                    {course.level}
                                </td>

                                <td className="px-6 py-5 font-semibold text-green-400">
                                    ₹{course.price}
                                </td>

                                <td className="px-6 py-5">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${course.is_published
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {course.is_published
                                            ? "Published"
                                            : "Draft"}
                                    </span>

                                </td>

                                <td className="px-6 py-5 text-center">

                                    <button
                                        onClick={() => navigate(`/courses/${course.id}`)}
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

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default CourseTable;