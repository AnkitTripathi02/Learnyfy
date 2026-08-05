import { FaFire } from "react-icons/fa";

const ProgressCard = () => {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#141222] p-6 shadow-lg">

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                    Learning Progress
                </h2>

                <div className="rounded-xl bg-purple-600 p-3 text-white">
                    <FaFire />
                </div>
            </div>

            <div className="mt-8">
                <div className="mb-2 flex justify-between text-sm text-gray-400">
                    <span>Overall Progress</span>
                    <span>72%</span>
                </div>

                <div className="h-3 w-full rounded-full bg-[#242236]">
                    <div className="h-3 w-[72%] rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">

                <div className="rounded-xl bg-[#1b1a2b] p-4 text-center">
                    <h3 className="text-2xl font-bold text-white">
                        12
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Courses
                    </p>
                </div>

                <div className="rounded-xl bg-[#1b1a2b] p-4 text-center">
                    <h3 className="text-2xl font-bold text-white">
                        8
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Completed
                    </p>
                </div>

                <div className="rounded-xl bg-[#1b1a2b] p-4 text-center">
                    <h3 className="text-2xl font-bold text-white">
                        145
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        XP
                    </p>
                </div>

            </div>

        </div>
    );
};

export default ProgressCard;