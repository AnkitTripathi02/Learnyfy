import {
    FaCheckCircle,
    FaBookOpen,
    FaClipboardCheck,
} from "react-icons/fa";

const ActivityCard = () => {

    const activities = [
        {
            icon: <FaBookOpen />,
            title: "Started React Course",
            time: "2 hours ago",
        },
        {
            icon: <FaClipboardCheck />,
            title: "Completed Practice Set",
            time: "Yesterday",
        },
        {
            icon: <FaCheckCircle />,
            title: "Passed JavaScript Quiz",
            time: "2 days ago",
        },
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-[#141222] p-6 shadow-lg">

            <h2 className="text-xl font-semibold text-white">
                Recent Activity
            </h2>

            <div className="mt-6 space-y-5">

                {activities.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl bg-[#1b1a2b] p-4"
                    >

                        <div className="rounded-lg bg-purple-600 p-3 text-white">
                            {item.icon}
                        </div>

                        <div>
                            <p className="font-medium text-white">
                                {item.title}
                            </p>

                            <p className="text-sm text-gray-400">
                                {item.time}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default ActivityCard;