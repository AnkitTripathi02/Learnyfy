import {
  FaBell,
  FaSearch,
  FaBars,
  FaCheck,
  FaCheckDouble,
  FaTimes,
} from "react-icons/fa";

import { useLocation } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import ProfileDrawer from "../profile/ProfileDrawer";

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "success" | "info" | "warning";
  read: boolean;
}

const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: "Welcome to LearnyFy 🎓",
    message: "Your learning journey starts here.",
    time: "Just now",
    type: "info",
    read: false,
  },
  {
    id: 2,
    title: "Course Update",
    message: "New courses are available for you.",
    time: "10 min ago",
    type: "success",
    read: false,
  },
  {
    id: 3,
    title: "Keep Learning 🚀",
    message: "Continue your pending courses.",
    time: "1 hour ago",
    type: "warning",
    read: true,
  },
];

const Navbar = ({
  collapsed,
  setCollapsed,
}: NavbarProps) => {
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const { search, setSearch } = useSearch();

  const [openProfile, setOpenProfile] =
    useState(false);

  const [openNotifications, setOpenNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState<Notification[]>(() => {
      const saved =
        localStorage.getItem(
          "learnyfy_notifications"
        );

      return saved
        ? JSON.parse(saved)
        : defaultNotifications;
    });

  /* ==========================================
     SAVE NOTIFICATIONS
  ========================================== */

  useEffect(() => {
    localStorage.setItem(
      "learnyfy_notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  /* ==========================================
     PAGE TITLE
  ========================================== */

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";

      case "/admin/dashboard":
        return "Admin Dashboard";

      case "/admin/courses":
        return "Course Management";

      case "/admin/students":
        return "Students";

      case "/admin/payments":
        return "Payments";

      case "/admin/analytics":
        return "Analytics";

      case "/admin/reports":
        return "Reports";

      case "/dashboard/my-courses":
        return "My Courses";

      case "/profile":
        return "Profile";

      case "/settings":
        return "Settings";

      case "/quiz":
        return "Quiz";

      case "/practice":
        return "Practice";

      case "/achievements":
        return "Achievements";

      default:
        return "LearnyFy";
    }
  };

  /* ==========================================
     INITIALS
  ========================================== */

  const initials =
    user.full_name
      ?.split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  /* ==========================================
     UNREAD COUNT
  ========================================== */

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  /* ==========================================
     MARK SINGLE NOTIFICATION READ
  ========================================== */

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  /* ==========================================
     MARK ALL READ
  ========================================== */

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  /* ==========================================
     DELETE NOTIFICATION
  ========================================== */

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.id !== id
      )
    );
  };

  return (
    <>
      <header className="relative flex h-24 items-center justify-between border-b border-white/10 bg-[#141222] px-8">

        {/* ======================================
            LEFT
        ====================================== */}

        <div className="flex items-center gap-6">

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#1b1a2b]
              text-gray-300
              transition-all
              duration-300
              hover:text-white
              hover:shadow-lg
            "
          >
            <FaBars />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-white">
              {getPageTitle()}
            </h1>

            <p className="text-sm text-gray-400">
              Home / {getPageTitle()}
            </p>
          </div>

        </div>

        {/* ======================================
            SEARCH
        ====================================== */}

        <div className="relative hidden w-96 lg:block">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search..."
            className="
              w-full
              rounded-xl
              border
              border-transparent
              bg-[#222133]
              py-3
              pl-11
              pr-4
              text-white
              outline-none
              transition
              focus:border-purple-500
            "
          />

        </div>

        {/* ======================================
            RIGHT
        ====================================== */}

        <div className="flex items-center gap-6">

          {/* ====================================
              NOTIFICATION
          ==================================== */}

          <div className="relative">

            <button
              onClick={() =>
                setOpenNotifications(
                  (prev) => !prev
                )
              }
              className="
                relative
                rounded-xl
                bg-[#1b1a2b]
                p-3
                transition
                hover:bg-[#25233b]
              "
            >

              <FaBell className="text-xl text-gray-300" />

              {/* UNREAD BADGE */}

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  {unreadCount > 9
                    ? "9+"
                    : unreadCount}
                </span>
              )}

            </button>

            {/* ==================================
                NOTIFICATION DROPDOWN
            ================================== */}

            {openNotifications && (
              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-[380px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#171528]
                  shadow-2xl
                "
              >

                {/* HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    px-5
                    py-4
                  "
                >

                  <div>
                    <h3 className="font-semibold text-white">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {unreadCount} unread
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        text-purple-400
                        transition
                        hover:text-purple-300
                      "
                    >
                      <FaCheckDouble />

                      Mark all read
                    </button>
                  )}

                </div>

                {/* NOTIFICATION LIST */}

                <div className="max-h-[400px] overflow-y-auto">

                  {notifications.length === 0 ? (

                    /* EMPTY STATE */

                    <div className="flex flex-col items-center justify-center px-6 py-12">

                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10">

                        <FaBell className="text-xl text-purple-400" />

                      </div>

                      <p className="font-medium text-white">
                        No notifications
                      </p>

                      <p className="mt-1 text-center text-xs text-gray-500">
                        You're all caught up!
                      </p>

                    </div>

                  ) : (

                    notifications.map(
                      (notification) => (
                        <div
                          key={
                            notification.id
                          }
                          className={`
                            group
                            relative
                            border-b
                            border-white/5
                            px-5
                            py-4
                            transition
                            ${
                              notification.read
                                ? "bg-transparent"
                                : "bg-purple-500/[0.06]"
                            }
                            hover:bg-white/[0.04]
                          `}
                        >

                          <div className="flex gap-3">

                            {/* STATUS DOT */}

                            <div className="pt-1">

                              <div
                                className={`
                                  h-2.5
                                  w-2.5
                                  rounded-full
                                  ${
                                    notification.type ===
                                    "success"
                                      ? "bg-green-400"
                                      : notification.type ===
                                        "warning"
                                      ? "bg-yellow-400"
                                      : "bg-purple-400"
                                  }
                                `}
                              />

                            </div>

                            {/* CONTENT */}

                            <div className="min-w-0 flex-1">

                              <div className="flex items-start justify-between gap-3">

                                <p
                                  className={`
                                    text-sm
                                    ${
                                      notification.read
                                        ? "font-medium text-gray-300"
                                        : "font-semibold text-white"
                                    }
                                  `}
                                >
                                  {
                                    notification.title
                                  }
                                </p>

                                <button
                                  onClick={() =>
                                    deleteNotification(
                                      notification.id
                                    )
                                  }
                                  className="
                                    opacity-0
                                    transition
                                    group-hover:opacity-100
                                    text-gray-500
                                    hover:text-red-400
                                  "
                                >
                                  <FaTimes className="text-xs" />
                                </button>

                              </div>

                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                {
                                  notification.message
                                }
                              </p>

                              <div className="mt-2 flex items-center justify-between">

                                <span className="text-[11px] text-gray-600">
                                  {
                                    notification.time
                                  }
                                </span>

                                {!notification.read && (
                                  <button
                                    onClick={() =>
                                      markAsRead(
                                        notification.id
                                      )
                                    }
                                    className="
                                      flex
                                      items-center
                                      gap-1
                                      text-[11px]
                                      text-purple-400
                                      hover:text-purple-300
                                    "
                                  >
                                    <FaCheck />

                                    Mark read
                                  </button>
                                )}

                              </div>

                            </div>

                          </div>

                        </div>
                      )
                    )
                  )}

                </div>

                {/* FOOTER */}

                {notifications.length > 0 && (
                  <div className="border-t border-white/10 px-5 py-3 text-center">

                    <button
                      onClick={() =>
                        setOpenNotifications(
                          false
                        )
                      }
                      className="
                        text-xs
                        font-medium
                        text-gray-500
                        transition
                        hover:text-white
                      "
                    >
                      Close
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* ====================================
              PROFILE
          ==================================== */}

          <div
            onClick={() =>
              setOpenProfile(true)
            }
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              p-2
              transition
              hover:bg-[#1b1a2b]
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-purple-600
                to-indigo-600
                font-bold
                text-white
              "
            >
              {initials}
            </div>

            <div>

              <h3 className="font-semibold text-white">
                {user.full_name}
              </h3>

              <p className="text-sm capitalize text-gray-400">
                {user.role}
              </p>

            </div>

          </div>

        </div>

      </header>

      <ProfileDrawer
        open={openProfile}
        onClose={() =>
          setOpenProfile(false)
        }
      />
    </>
  );
};

export default Navbar;