import {
  FaBookOpen,
  FaHome,
  FaGraduationCap,
  FaSignOutAlt,
  FaUserGraduate,
  FaCreditCard,
  FaChartLine,
  FaFileInvoice,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({
  collapsed,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isAdmin = user.role === "admin";

  // =========================
  // LOGOUT CONFIRMATION
  // =========================
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      html: `
        <span style="color:#9ca3af">
          You will be logged out from your LearnyFy account.
        </span>
      `,
      background: "#141222",
      color: "#fff",

      showCancelButton: true,

      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",

      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#374151",

      reverseButtons: true,

      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        html: `
          <span style="color:#9ca3af">
            You have been logged out successfully.
          </span>
        `,
        background: "#141222",
        color: "#fff",
        iconColor: "#22c55e",

        timer: 1200,
        showConfirmButton: false,

        customClass: {
          popup: "rounded-2xl",
        },
      });

      navigate("/login", {
        replace: true,
      });
    }
  };

  const menuItems = isAdmin
  ? [
      {
        icon: <FaHome />,
        title: "Dashboard",
        path: "/admin/dashboard",
      },
      {
        icon: <FaGraduationCap />,
        title: "Course Management",
        path: "/admin/courses",
      },
      {
        icon: <FaUserGraduate />,
        title: "Students",
        path: "/admin/students",
      },
      {
        icon: <FaCreditCard />,
        title: "Payments",
        path: "/admin/payments",
      },
      {
        icon: <FaChartLine />,
        title: "Analytics",
        path: "/admin/analytics",
      },
      {
        icon: <FaFileInvoice />,
        title: "Reports",
        path: "/admin/reports",
      },
    ]
    : [
        {
          icon: <FaHome />,
          title: "Dashboard",
          path: "/dashboard",
        },
        {
          icon: <FaGraduationCap />,
          title: "My Courses",
          path: "/dashboard/my-courses",
        },
      ];

  return (
    <aside
      className={`
        relative
        bg-[#141222]
        border-r
        border-white/10
        flex
        flex-col
        h-screen
        transition-all
        duration-300
        ease-in-out
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* Header */}

      <div
        className={`
          border-b
          border-white/10
          h-24
          flex
          items-center
          ${collapsed ? "justify-center" : "px-6"}
        `}
      >
        <div
          className={`
            flex
            items-center
            ${collapsed ? "" : "gap-3"}
          `}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
            <FaBookOpen className="text-xl text-white" />
          </div>

          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold text-white">
                LearnyFy
              </h2>

              <p className="text-xs text-gray-400">
                Learning Platform
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}

      <div className="mx-1 flex-1 py-6">
        {menuItems.map((item, index) => {
          const isActive =
            location.pathname.startsWith(item.path);

          return (
            <button
              key={index}
              title={collapsed ? item.title : ""}
              onClick={() => navigate(item.path)}
              className={`
                group
                relative
                mb-2
                flex
                items-center
                gap-4
                rounded-xl
                py-4
                transition-all
                duration-300

                ${collapsed
                  ? "justify-center px-7"
                  : "justify-start px-6"
                }

                ${isActive
                  ? "w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "w-full text-gray-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <span
                className={`
                  text-xl
                  ${collapsed ? "mx-auto" : ""}
                `}
              >
                {item.icon}
              </span>

              {!collapsed && (
                <span className="font-medium">
                  {item.title}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout */}

      <div className="border-t border-white/10 p-1">
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : ""}
          className={`
            flex
            items-center
            justify-center
            gap-3
            bg-red-600
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-red-700
            hover:shadow-lg

            ${
              collapsed
                ? "mx-auto h-12 w-12 rounded-xl"
                : "w-full rounded-md py-3"
            }
          `}
        >
          <FaSignOutAlt />

          {!collapsed && (
            <span>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;