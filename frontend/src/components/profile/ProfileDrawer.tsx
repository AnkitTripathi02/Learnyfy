import {
  FaTimes,
  FaUser,
  FaCog,
  FaLock,
  FaSignOutAlt,
  FaBell,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ProfileHome from "./ProfileHome";
import ProfileInfo from "./ProfileInfo";
import Security from "./Security";
import Settings from "./Settings";
import Notification from "./Notification";

interface Props {
  open: boolean;
  onClose: () => void;
}

type ActiveTab =
  | "home"
  | "profile"
  | "security"
  | "settings"
  | "notifications";

const ProfileDrawer = ({ open, onClose }: Props) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

  const initials =
    user.full_name
      ?.split(" ")
      .map((x: string) => x[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onClose();
    navigate("/login");
  };

  const closeDrawer = () => {
    onClose();

    // Drawer close hone ke baad next time Home se open hoga
    setTimeout(() => {
      setActiveTab("home");
    }, 300);
  };

  const menuItem =
    "group flex w-full items-center justify-between rounded-xl text-white px-4 py-3.5 text-white transition-all duration-300 hover:translate-x-1 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600";

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileInfo
            user={user}
            initials={initials}
          />
        );

      case "security":
        return <Security />;

      case "settings":
        return <Settings />;

      case "notifications":
        return <Notification />;

      default:
        return (
          <ProfileHome
            user={user}
            initials={initials}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
    }
  };



  return (
    <>
      {/* Overlay */}

      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}

      <div
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-[420px] flex-col border-l border-white/10 bg-[#111021] shadow-2xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 bg-[#141222] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-bold text-white">
              {initials}
            </div>

            <div>
              <h2 className="font-semibold text-white">
                {user.full_name || "User"}
              </h2>

              <p className="text-xs capitalize text-gray-500">
                {user.role || "Student"}
              </p>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto p-5">
          {activeTab !== "home" && (
            <button
              onClick={() => setActiveTab("home")}
              className="mb-5 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
              ← Back to Profile
            </button>
          )}

          {renderContent()}

          {/* Navigation Menu */}

          {activeTab === "home" && (
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setActiveTab("profile")}
                className={menuItem}
              >
                <div className="flex items-center gap-4">
                  <FaUser className="text-purple-400" />

                  <span>My Profile</span>
                </div>

                <FaChevronRight className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-white" />
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={menuItem}
              >
                <div className="flex items-center gap-4">
                  <FaLock className="text-blue-400" />

                  <span>Security</span>
                </div>

                <FaChevronRight className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-white" />
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={menuItem}
              >
                <div className="flex items-center gap-4">
                  <FaCog className="text-yellow-400" />

                  <span>Settings</span>
                </div>

                <FaChevronRight className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-white" />
              </button>

              <button
                onClick={() =>
                  setActiveTab("notifications")
                }
                className={menuItem}
              >
                <div className="flex items-center gap-4">
                  <FaBell className="text-green-400" />

                  <span>Notifications</span>
                </div>

                <FaChevronRight className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-white" />
              </button>

              {/* Admin / Student */}

              {/* {user.role === "admin" ? (
                <button
                  onClick={() => {
                    navigate("/dashboard/admin/courses");
                    closeDrawer();
                  }}
                  className={menuItem}
                >
                  <div className="flex items-center gap-4">
                    <FaBookOpen className="text-indigo-400" />

                    <span>Course Management</span>
                  </div>

                  <FaChevronRight className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-white" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/dashboard/my-courses");
                    closeDrawer();
                  }}
                  className={menuItem}
                >
                  <div className="flex items-center gap-4">
                    <FaBookOpen className="text-indigo-400" />

                    <span>My Courses</span>
                  </div>

                  <FaChevronRight className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-white" />
                </button>
              )} */}
            </div>
          )}
        </div>

        {/* Footer */}

        <div className="border-t border-white/10 bg-[#141222] p-5">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3.5 font-semibold text-white transition hover:scale-[1.01] hover:from-red-500 hover:to-red-600"
          >
            <FaSignOutAlt />

            Logout
          </button>

          <p className="mt-3 text-center text-xs text-gray-600">
            LearnyFy Account Center
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;