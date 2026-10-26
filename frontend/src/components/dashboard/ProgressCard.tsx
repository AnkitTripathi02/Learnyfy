import { FaFire } from "react-icons/fa";

interface ProgressCardProps {
    overallProgress: number;
    totalCourses: number;
    completedCourses: number;
    totalLessons: number;
    completedLessons: number;
}

const ProgressCard = ({
    overallProgress,
    totalCourses,
    completedCourses,
    totalLessons,
    completedLessons,
}: ProgressCardProps) => {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#141222] p-6 shadow-lg">

            {/* HEADER */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-semibold text-white">
                        Learning Progress
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Keep going and complete your learning journey.
                    </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <FaFire />
                </div>

            </div>


            {/* PROGRESS */}
            <div className="mt-8">

                <div className="mb-2 flex justify-between text-sm">

                    <span className="text-gray-400">
                        Overall Progress
                    </span>

                    <span className="font-semibold text-purple-400">
                        {overallProgress}%
                    </span>

                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-[#242236]">

                    <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700"
                        style={{
                            width: `${Math.min(
                                Math.max(overallProgress, 0),
                                100
                            )}%`,
                        }}
                    />

                </div>

            </div>


            {/* STATS */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

                {/* COURSES */}
                <div className="rounded-xl border border-white/5 bg-[#111021] p-4 text-center">

                    <h3 className="text-2xl font-bold text-white">
                        {totalCourses}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Courses
                    </p>

                </div>


                {/* COMPLETED */}
                <div className="rounded-xl border border-white/5 bg-[#111021] p-4 text-center">

                    <h3 className="text-2xl font-bold text-white">
                        {completedCourses}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Completed
                    </p>

                </div>


                {/* LESSONS */}
                <div className="rounded-xl border border-white/5 bg-[#111021] p-4 text-center">

                    <h3 className="text-2xl font-bold text-white">
                        {completedLessons}
                        <span className="text-sm font-normal text-gray-500">
                            /{totalLessons}
                        </span>
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Lessons
                    </p>

                </div>


                {/* COMPLETION */}
                <div className="rounded-xl border border-white/5 bg-[#111021] p-4 text-center">

                    <h3 className="text-2xl font-bold text-white">
                        {totalCourses > 0
                            ? Math.round(
                                  (completedCourses / totalCourses) * 100
                              )
                            : 0}
                        %
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Course Completion
                    </p>

                </div>

            </div>

        </div>
    );
};

export default ProgressCard;