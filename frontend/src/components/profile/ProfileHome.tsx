import {
  FaBookOpen,
  FaGraduationCap,
} from "react-icons/fa";

interface Props {
  user: any;
  initials: string;
  onNavigate: (
    tab:
      | "profile"
      | "security"
      | "settings"
      | "notifications"
  ) => void;
}

const ProfileHome = ({
  user,
  initials,
}: Props) => {
  return (
    <div className="space-y-6">

      {/* Profile Hero */}

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-transparent p-6">

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/10 blur-2xl" />

        <div className="relative flex items-center gap-4">

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-2xl font-bold text-white shadow-lg">
            {initials}
          </div>

          <div className="min-w-0">

            <h2 className="truncate text-xl font-bold text-white">
              {user.full_name || "User"}
            </h2>

            <p className="truncate text-sm text-gray-400">
              {user.email || "No email"}
            </p>

            <span className="mt-2 inline-block rounded-full bg-purple-500/20 px-3 py-1 text-xs capitalize text-purple-300">
              {user.role || "Student"}
            </span>

          </div>

        </div>

      </div>

      {/* Account Overview */}

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Account Overview
        </h3>

        <div className="grid grid-cols-2 gap-3">

          <div className="rounded-xl border border-white/10 text-white p-4">
            <FaGraduationCap className="mb-3 text-xl text-purple-400" />

            <p className="text-xs text-gray-500">
              Learning
            </p>

            <p className="mt-1 font-semibold text-white">
              Active
            </p>
          </div>

          <div className="rounded-xl border border-white/10 text-white p-4">
            <FaBookOpen className="mb-3 text-xl text-blue-400" />

            <p className="text-xs text-gray-500">
              Courses
            </p>

            <p className="mt-1 font-semibold text-white">
              {user.role === "admin"
                ? "Management"
                : "My Courses"}
            </p>
          </div>

        </div>
      </div>

      {/* Account Settings */}

      {/* <div>

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Account
        </h3>

        <div className="space-y-3">

          <button
            onClick={() => onNavigate("profile")}
            className="group flex w-full items-center justify-between rounded-xl border border-white/10 text-white p-4 text-left transition hover:border-purple-500/40 hover:bg-purple-600/10"
          >
            <div className="flex items-center gap-4">

              <div className="rounded-lg bg-purple-500/10 p-3 text-purple-400">
                <FaUser />
              </div>

              <div>
                <p className="font-medium text-white">
                  Personal Information
                </p>

                <p className="text-xs text-gray-500">
                  Manage your profile details
                </p>
              </div>

            </div>

            <span className="text-gray-500 transition group-hover:translate-x-1">
              →
            </span>
          </button>

          <button
            onClick={() => onNavigate("security")}
            className="group flex w-full items-center justify-between rounded-xl border border-white/10 text-white p-4 text-left transition hover:border-blue-500/40 hover:bg-blue-600/10"
          >
            <div className="flex items-center gap-4">

              <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
                <FaShieldAlt />
              </div>

              <div>
                <p className="font-medium text-white">
                  Security
                </p>

                <p className="text-xs text-gray-500">
                  Password and account security
                </p>
              </div>

            </div>

            <span className="text-gray-500 transition group-hover:translate-x-1">
              →
            </span>
          </button>

          <button
            onClick={() => onNavigate("settings")}
            className="group flex w-full items-center justify-between rounded-xl border border-white/10 text-white p-4 text-left transition hover:border-yellow-500/40 hover:bg-yellow-600/10"
          >
            <div className="flex items-center gap-4">

              <div className="rounded-lg bg-yellow-500/10 p-3 text-yellow-400">
                <FaCog />
              </div>

              <div>
                <p className="font-medium text-white">
                  Preferences
                </p>

                <p className="text-xs text-gray-500">
                  Customize your experience
                </p>
              </div>

            </div>

            <span className="text-gray-500 transition group-hover:translate-x-1">
              →
            </span>
          </button>

          <button
            onClick={() =>
              onNavigate("notifications")
            }
            className="group flex w-full items-center justify-between rounded-xl border border-white/10 text-white p-4 text-left transition hover:border-green-500/40 hover:bg-green-600/10"
          >
            <div className="flex items-center gap-4">

              <div className="rounded-lg bg-green-500/10 p-3 text-green-400">
                <FaBell />
              </div>

              <div>
                <p className="font-medium text-white">
                  Notifications
                </p>

                <p className="text-xs text-gray-500">
                  Manage your notifications
                </p>
              </div>

            </div>

            <span className="text-gray-500 transition group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>

      </div> */}

    </div>
  );
};

export default ProfileHome;