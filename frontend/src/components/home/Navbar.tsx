import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-bold text-indigo-600"
        >
          <FaGraduationCap className="text-4xl" />
          LearnyFy
        </Link>

        {/* Menu */}
        <nav className="hidden items-center gap-10 md:flex">

          <a
            href="#home"
            className="font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Home
          </a>

          <a
            href="#categories"
            className="font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Categories
          </a>

          <a
            href="#courses"
            className="font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Courses
          </a>

          <a
            href="#about"
            className="font-medium text-gray-700 transition hover:text-indigo-600"
          >
            About
          </a>

          <a
            href="#contact"
            className="font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Contact
          </a>

        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="rounded-xl border border-indigo-600 px-6 py-2 font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white shadow-lg transition hover:bg-indigo-700"
          >
            Sign Up
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;