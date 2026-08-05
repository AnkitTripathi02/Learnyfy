import {
  FaBookOpen,
  FaHome,
  FaGraduationCap,
  FaClipboardCheck,
  FaTrophy,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isAdmin = user.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      icon: <FaHome />,
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FaGraduationCap />,
      title: isAdmin ? "Course Management" : "My Courses",
      path: isAdmin ? "/courses" : "/my-courses",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Practice",
      path: "/practice",
    },
    {
      icon: <FaBookOpen />,
      title: "Quiz",
      path: "/quiz",
    },
    {
      icon: <FaTrophy />,
      title: "Achievements",
      path: "/achievements",
    },
    {
      icon: <FaUserCircle />,
      title: "Profile",
      path: "/profile",
    },
    {
      icon: <FaCog />,
      title: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className="w-72 h-screen bg-[#141222] border-r border-white/10 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-white/10">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
          <FaBookOpen className="text-white text-xl" />
        </div>

        <div>
          <h2 className="text-white text-xl font-bold">
            LearnFy
          </h2>

          <p className="text-xs text-gray-400">
            Learning Platform
          </p>
        </div>

      </div>

      {/* Menu */}
      <div className="flex-1 py-6">

        {menuItems.map((item, index) => (

          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
              index === 0
                ? "bg-gradient-to-r from-purple-600/30 to-indigo-600/20 border-r-4 border-purple-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.title}
            </span>

          </button>

        ))}

      </div>

      {/* Logout */}
      <div className="p-6 border-t border-white/10">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;