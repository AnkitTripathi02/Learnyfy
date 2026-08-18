import { useNavigate, useParams } from "react-router-dom";
import {
    FaCheckCircle,
    FaCertificate,
    FaBookOpen,
    FaHome,
} from "react-icons/fa";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const CourseCompleted = () => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[#07070c] flex items-center justify-center px-4">

                <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#11101d] p-10 text-center shadow-2xl">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/15">

                        <FaCheckCircle className="text-6xl text-green-400" />

                    </div>

                    <h1 className="mt-8 text-5xl font-black text-white">

                        Congratulations 🎉

                    </h1>

                    <p className="mt-4 text-gray-400 text-lg">

                        You have successfully completed this course.

                    </p>

                    <div className="mt-10">

                        <div className="h-3 rounded-full bg-white/10 overflow-hidden">

                            <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-400" />

                        </div>

                        <p className="mt-3 text-green-400 font-bold">

                            100% Completed

                        </p>

                    </div>

                    <div className="mt-10 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">

                        <FaCertificate className="mx-auto text-5xl text-yellow-400" />

                        <h2 className="mt-4 text-2xl font-bold">

                            Certificate Unlocked

                        </h2>

                        <p className="mt-2 text-gray-400">

                            Your certificate is now ready.

                        </p>

                    </div>

                    <div className="mt-10 flex flex-col gap-4">

                        <button
                            className="rounded-xl bg-indigo-600 py-4 font-bold hover:bg-indigo-500"
                        >
                            Download Certificate
                        </button>

                        <button
                            onClick={() => navigate("/my-courses")}
                            className="rounded-xl border border-white/10 py-4 hover:bg-white/5"
                        >
                            <FaBookOpen className="inline mr-2" />
                            My Courses
                        </button>

                        <button
                            onClick={() => navigate("/courses")}
                            className="rounded-xl border border-white/10 py-4 hover:bg-white/5"
                        >
                            <FaHome className="inline mr-2" />
                            Explore Courses
                        </button>

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );
};

export default CourseCompleted;