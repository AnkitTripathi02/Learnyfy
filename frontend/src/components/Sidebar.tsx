import { useState } from "react";
import {
  FaBookOpen,
  FaHome,
  FaChartBar,
  FaCalendarAlt,
  FaTrophy,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  const menuItems = [
    {
      icon: <FaHome className="text-xl" />,
      label: "Home",
      active: true,
    },
    {
      icon: <FaBookOpen className="text-xl" />,
      label: "Courses",
    },
    {
      icon: <FaChartBar className="text-xl" />,
      label: "Progress",
    },
    {
      icon: <FaCalendarAlt className="text-xl" />,
      label: "Schedule",
    },
    {
      icon: <FaTrophy className="text-xl" />,
      label: "Achievements",
    },
  ];

  return (
    <div
      className={`absolute left-0 top-0 h-full ${
        isOpen ? "w-64" : "w-20"
      } bg-[#0b0a17]/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-center py-5 border-b gap-4 border-white/10">
      
        
          {isOpen && (
            <h2 className="text-white font-bold text-xl">
              LearnHub
            </h2>
          )}
       

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-xl hover:text-purple-400 transition"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 mt-8 px-3">

        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
              item.active
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:bg-purple-600/20 hover:text-white"
            }`}
          >
            {item.icon}

            {isOpen && (
              <span className="font-medium">
                {item.label}
              </span>
            )}
          </button>
        ))}

      </div>

      {/* Bottom */}

      <div className="mt-auto p-4 border-t border-white/10">

        <button
          type="button"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={darkMode}
          onClick={() => setDarkMode(!darkMode)}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-purple-600 py-3 text-white transition hover:bg-purple-500"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {isOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}

        </button>

      </div>
    </div>
  );
};

export default Sidebar;