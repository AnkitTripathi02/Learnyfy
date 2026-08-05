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
      className="bg-gray-900 text-gray-300"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3">

              <FaGraduationCap className="text-4xl text-indigo-500" />

              <h2 className="text-3xl font-bold text-white">
                LearnyFy
              </h2>

            </div>

            <p className="mt-5 leading-7 text-gray-400">
              Learn programming, Full Stack Development,
              Artificial Intelligence, Cloud Computing,
              Data Science and many more technologies with
              industry-ready courses.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a href="#home" className="hover:text-indigo-400">
                  Home
                </a>
              </li>

              <li>
                <a href="#courses" className="hover:text-indigo-400">
                  Courses
                </a>
              </li>

              <li>
                <a href="#categories" className="hover:text-indigo-400">
                  Categories
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-indigo-400">
                  About Us
                </a>
              </li>

            </ul>

          </div>

          {/* Categories */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Popular Courses
            </h3>

            <ul className="space-y-3">

              <li>React Development</li>

              <li>Python Programming</li>

              <li>Java Development</li>

              <li>Artificial Intelligence</li>

              <li>Data Science</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Contact
            </h3>

            <p>Email</p>
            <p className="text-indigo-400">
              support@learnyfy.com
            </p>

            <p className="mt-4">
              Mumbai, Maharashtra
            </p>

            <div className="mt-8 flex gap-5 text-2xl">

              <FaFacebook className="cursor-pointer hover:text-indigo-400" />

              <FaInstagram className="cursor-pointer hover:text-pink-500" />

              <FaLinkedin className="cursor-pointer hover:text-blue-400" />

              <FaGithub className="cursor-pointer hover:text-white" />

            </div>

          </div>

        </div>

        <hr className="my-10 border-gray-700" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p>
            © {new Date().getFullYear()} LearnyFy.
            All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <a
              href="/privacy"
              className="hover:text-indigo-400"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="hover:text-indigo-400"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;