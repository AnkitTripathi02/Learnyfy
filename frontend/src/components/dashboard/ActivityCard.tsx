import {
    FaCheckCircle,
    FaBookOpen,
} from "react-icons/fa";

interface Activity {
    type: string;
    title: string;
    completed_at: string;
}

interface ActivityCardProps {
    activities: Activity[];
}

const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
        return "Just now";
    }

    if (diffMinutes < 60) {
        return `${diffMinutes} min ago`;
    }

    if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }

    if (diffDays === 1) {
        return "Yesterday";
    }

    if (diffDays < 7) {
        return `${diffDays} days ago`;
    }

    return date.toLocaleDateString();
};

const ActivityCard = ({
    activities,
}: ActivityCardProps) => {

    return (
        <div className="rounded-2xl border border-white/10 bg-[#141222] p-10 shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-semibold text-white">
                        Recent Activity
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Your latest learning activity
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/15 text-purple-400">
                    <FaCheckCircle />
                </div>

            </div>


            {/* Activities */}
            <div className="mt-6 space-y-3">

                {activities.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-white/10 bg-[#111021] px-4 py-8 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                            <FaBookOpen />
                        </div>

                        <p className="mt-3 text-sm font-medium text-gray-300">
                            No recent activity
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Complete a lesson to see your activity here.
                        </p>

                    </div>

                ) : (

                    activities.map((item, index) => (

                        <div
                            key={`${item.completed_at}-${index}`}
                            className="group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-white/5 hover:bg-[#111021]"
                        >

                            {/* Icon */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                                <FaCheckCircle />
                            </div>


                            {/* Content */}
                            <div className="min-w-0 flex-1">

                                <p className="truncate text-sm font-medium text-white">
                                    {item.title}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    {formatTimeAgo(item.completed_at)}
                                </p>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default ActivityCard;