import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (section: string) => {
    // Agar already Home page par hain
    if (location.pathname === "/") {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // Kisi bhi doosre page se Home par jao
      navigate(`/#${section}`);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#090817]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-indigo-500 transition hover:text-indigo-400"
        >
          <FaGraduationCap className="text-3xl" />
          LearnyFy
        </Link>

        {/* ================= MENU ================= */}

        <nav className="hidden items-center gap-8 md:flex">

          {/* Home */}
          <Link
            to="/"
            className="font-medium text-gray-200 transition hover:text-indigo-400"
          >
            Home
          </Link>

          {/* Categories */}
          <button
            type="button"
            onClick={() => goToSection("categories")}
            className="font-medium text-gray-200 transition hover:text-indigo-400"
          >
            Categories
          </button>

          {/* Courses */}
          <Link
            to="/courses"
            className="font-medium text-gray-200 transition hover:text-indigo-400"
          >
            Courses
          </Link>

          {/* About */}
          <button
            type="button"
            onClick={() => goToSection("about")}
            className="font-medium text-gray-200 transition hover:text-indigo-400"
          >
            About
          </button>

          {/* Contact */}
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="font-medium text-gray-200 transition hover:text-indigo-400"
          >
            Contact
          </button>

        </nav>

        {/* ================= BUTTONS ================= */}

        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="rounded-xl border border-indigo-600 px-5 py-2 font-semibold text-indigo-400 transition hover:bg-indigo-600 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="hidden rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white shadow-lg transition hover:bg-indigo-500 sm:block"
          >
            Sign Up
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;