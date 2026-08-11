import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaGraduationCap,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-[#0f172a] text-gray-400"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Top */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <FaGraduationCap className="text-4xl text-indigo-500" />

              <h2 className="text-3xl font-bold text-white">
                LearnyFy
              </h2>
            </div>

            <p className="mt-5 leading-8">
              Learn programming, Full Stack Development,
              Artificial Intelligence, Cloud Computing,
              Data Science and many more technologies
              with industry-ready courses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="#home"
                  className="transition hover:text-indigo-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#courses"
                  className="transition hover:text-indigo-400"
                >
                  Courses
                </a>
              </li>

              <li>
                <a
                  href="#categories"
                  className="transition hover:text-indigo-400"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition hover:text-indigo-400"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="transition hover:text-indigo-400"
                >
                  Contact
                </a>
              </li>

            </ul>
          </div>

          {/* Popular Courses */}
          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Popular Courses
            </h3>

            <ul className="space-y-3">

              <li className="cursor-pointer transition hover:text-white">
                React Development
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Python Programming
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Java Development
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Artificial Intelligence
              </li>

              <li className="cursor-pointer transition hover:text-white">
                Data Science
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Contact
            </h3>

            <p>Email</p>

            <p className="mt-1 text-indigo-400">
              support@learnyfy.com
            </p>

            <p className="mt-4">
              Mumbai, Maharashtra
            </p>

            <div className="mt-8 flex gap-5 text-2xl">

              <FaFacebook className="cursor-pointer transition hover:text-blue-500" />

              <FaInstagram className="cursor-pointer transition hover:text-pink-500" />

              <FaLinkedin className="cursor-pointer transition hover:text-sky-500" />

              <FaGithub className="cursor-pointer transition hover:text-white" />

            </div>

          </div>

        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-700" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p className="text-sm">
            © {new Date().getFullYear()} LearnyFy.
            All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">

            <Link
              to="/privacy"
              className="transition hover:text-indigo-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-indigo-400"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/faq"
              className="transition hover:text-indigo-400"
            >
              FAQ
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;