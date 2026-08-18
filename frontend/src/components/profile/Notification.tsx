import {
  FaBell,
  FaBookOpen,
  FaCreditCard,
  FaTrophy,
} from "react-icons/fa";

const Notification = () => {
  const notifications = [
    {
      icon: <FaBookOpen />,
      title: "Course Update",
      message:
        "A new lesson has been added to your course.",
      time: "10 min ago",
      color: "text-blue-400 bg-blue-500/10",
    },
    {
      icon: <FaTrophy />,
      title: "Achievement",
      message:
        "You completed a learning milestone.",
      time: "2 hours ago",
      color:
        "text-yellow-400 bg-yellow-500/10",
    },
    {
      icon: <FaCreditCard />,
      title: "Payment",
      message:
        "Your payment was successfully processed.",
      time: "Yesterday",
      color:
        "text-green-400 bg-green-500/10",
    },
    {
      icon: <FaBell />,
      title: "Welcome",
      message:
        "Welcome to your LearnyFy account.",
      time: "2 days ago",
      color:
        "text-purple-400 bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
          <FaBell />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Notifications
          </h2>

          <p className="text-sm text-gray-500">
            Your latest account activity
          </p>
        </div>

      </div>

      <div className="space-y-3">

        {notifications.map(
          (notification, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 text-white p-4 transition hover:border-purple-500/30"
            >

              <div className="flex gap-4">

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notification.color}`}
                >
                  {notification.icon}
                </div>

                <div className="min-w-0">

                  <div className="flex items-center justify-between gap-3">

                    <h3 className="text-sm font-semibold text-white">
                      {notification.title}
                    </h3>

                    <span className="shrink-0 text-[10px] text-gray-600">
                      {notification.time}
                    </span>

                  </div>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {notification.message}
                  </p>

                </div>

              </div>

            </div>
          )
        )}

      </div>

      <button
        type="button"
        className="w-full rounded-xl border border-white/10 text-white py-3 text-sm font-medium text-gray-300 transition hover:bg-[#242238] hover:text-white"
      >
        Mark All as Read
      </button>

    </div>
  );
};

export default Notification;