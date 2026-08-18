import {
    useEffect,
    useState,
} from "react";
import {
    FaSearch,
    FaUserGraduate,
    FaUserCheck,
    FaUserTimes,
    FaDownload,
    FaTrash,
    FaBan,
    FaCheckCircle,
} from "react-icons/fa";

import Swal from "sweetalert2";
import { saveAs } from "file-saver";

import {
    getAllStudents,
    deleteStudent,
    changeStudentStatus,
} from "../../../api/adminStudentApi";

const AdminStudents = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const filteredStudents = students.filter((student) =>
        student.full_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
        student.email
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const loadStudents = async () => {
        try {
            const res = await getAllStudents();

            console.log("API Response", res);

            setStudents(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Delete Student?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Delete",
        });

        if (!result.isConfirmed) return;

        await deleteStudent(id);

        Swal.fire({
            icon: "success",
            title: "Deleted",
            timer: 1200,
            showConfirmButton: false,
        });

        loadStudents();
    };

    const handleExport = () => {
        if (filteredStudents.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Data",
                text: "There are no students to export.",
            });
            return;
        }

        const headers = [
            "Name",
            "Email",
            "Verified",
            "Status",
        ];

        const rows = filteredStudents.map((student) => [
            student.full_name,
            student.email,
            student.is_email_verified ? "Verified" : "Pending",
            student.is_active ? "Active" : "Inactive",
        ]);

        const csvContent = [
            headers,
            ...rows,
        ]
            .map((e) => e.join(","))
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        saveAs(
            blob,
            `LearnyFy_Students_${new Date().toLocaleDateString()}.csv`
        );
    };

    const handleStatus = async (id: string) => {
        await changeStudentStatus(id);
        loadStudents();
    };

    if (loading)
        return (
            <div className="text-white">
                <div className="flex h-[500px] items-center justify-center">

                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>

                </div>
            </div>
        );

    return (
        <div className="rounded-xl bg-[#141222] p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
                Student Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

                <div className="rounded-xl bg-[#1c1930] p-5 border border-gray-700">
                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-400 text-sm">
                                Total Students
                            </p>

                            <h2 className="text-3xl font-bold text-white">
                                {students.length}
                            </h2>

                        </div>

                        <FaUserGraduate className="text-3xl text-purple-500" />

                    </div>
                </div>

                <div className="rounded-xl bg-[#1c1930] p-5 border border-gray-700">
                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-400 text-sm">
                                Active
                            </p>

                            <h2 className="text-3xl font-bold text-green-400">
                                {
                                    students.filter(x => x.is_active).length
                                }
                            </h2>

                        </div>

                        <FaUserCheck className="text-3xl text-green-400" />

                    </div>
                </div>

                <div className="rounded-xl bg-[#1c1930] p-5 border border-gray-700">
                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-400 text-sm">
                                Inactive
                            </p>

                            <h2 className="text-3xl font-bold text-red-400">
                                {
                                    students.filter(x => !x.is_active).length
                                }
                            </h2>

                        </div>

                        <FaUserTimes className="text-3xl text-red-400" />

                    </div>
                </div>

            </div>
            <div className="mb-6 flex items-center justify-between">

                <div className="relative w-96">

                    <FaSearch className="absolute left-4 top-4 text-gray-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full rounded-xl bg-[#1d1a32] pl-11 pr-4 py-3 text-white outline-none border border-white/10 focus:border-purple-500"
                    />

                </div>

                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-white hover:bg-purple-700"
                >
                    <FaDownload />
                    Export
                </button>

            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10">

                <div className="max-h-[525px] overflow-y-auto">
                    <table className="w-full">

                        <thead className="sticky top-0 z-20 bg-[#575270]">

                            <tr className="border-b border-white/10 text-left text-gray-400">

                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Verification</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>

                            </tr>

                        </thead>

                        <tbody>
                            {filteredStudents.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="py-16 text-center text-gray-400"
                                    >

                                        No students found.

                                    </td>

                                </tr>

                            )}
                            {filteredStudents.map((student) => (

                                <tr
                                    key={student.id}
                                    className="border-b border-white/5 transition-all duration-300 hover:bg-white/5"
                                >

                                    <td className="py-5">

                                        <div className="flex items-center gap-3 ml-3">

                                            <div className="h-11 w-11 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">

                                                {student.full_name.charAt(0)}

                                            </div>

                                            <div>

                                                <p className="text-white font-semibold">

                                                    {student.full_name}

                                                </p>
{/* 
                                                <p className="text-gray-500 text-xs">

                                                    ID :
                                                    {student.id.slice(0, 8)}

                                                </p> */}

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 text-gray-300">
                                        {student.email}
                                    </td>

                                    <td className="pl-9">
                                        {student.is_email_verified ? (
                                            <span className="rounded bg-green-600 px-3 py-1 text-xs text-white">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="rounded bg-yellow-600 px-3 py-1 text-xs text-white">
                                                Pending
                                            </span>
                                        )}
                                    </td>

                                    <td className="p-5">
                                        <span
                                            className={`rounded px-3 py-1 text-xs text-white ${student.is_active
                                                ? "bg-green-600"
                                                : "bg-red-600"
                                                }`}
                                        >
                                            {student.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>

                                    <td>

                                        <div className="flex gap-2 justify-center">

                                            <button
                                                onClick={() => handleStatus(student.id)}
                                                className={`rounded-lg p-3 text-white ${student.is_active
                                                    ? "bg-orange-600 hover:bg-orange-700"
                                                    : "bg-green-600 hover:bg-green-700"
                                                    }`}
                                            >

                                                {student.is_active ? (
                                                    <FaBan />
                                                ) : (
                                                    <FaCheckCircle />
                                                )}

                                            </button>

                                            <button
                                                onClick={() => handleDelete(student.id)}
                                                className="rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
};

export default AdminStudents;