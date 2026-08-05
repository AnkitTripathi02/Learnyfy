import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBookOpen,
  FaAward,
} from "react-icons/fa";
import HeroSearch from "./HeroSearch";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 text-white"
    >
      <div className="mx-auto flex min-h-[100vh] max-w-7xl items-center px-6 py-24">

        {/* Left */}
        <div className="w-full lg:w-1/2">

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            🚀 India's #1 Learning Platform
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-6xl">
            Master Programming
            <br />
            Build Your Career
          </h1>

          <p className="mt-6 max-w-xl text-lg text-indigo-100">
            Learn Full Stack Development, React, Python,
            Java, AI, Data Science and much more with
            industry-ready courses.
          </p>

          {/* Search */}
          <div className="mt-10">
            <HeroSearch />
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/courses"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-indigo-700 transition hover:scale-105"
            >
              Explore Courses
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-indigo-700"
            >
              Start Learning
            </Link>

          </div>

          {/* Stats */}

          <div className="mt-14 flex flex-wrap gap-5">

            <div className="flex items-center gap-3 rounded-xl bg-white/10 p-5 backdrop-blur">
              <FaUsers className="text-3xl" />

              <div>
                <h3 className="text-2xl font-bold">
                  10K+
                </h3>

                <p className="text-indigo-100">
                  Students
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-white/10 p-5 backdrop-blur">
              <FaBookOpen className="text-3xl" />

              <div>
                <h3 className="text-2xl font-bold">
                  150+
                </h3>

                <p className="text-indigo-100">
                  Courses
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-white/10 p-5 backdrop-blur">
              <FaAward className="text-3xl" />

              <div>
                <h3 className="text-2xl font-bold">
                  95%
                </h3>

                <p className="text-indigo-100">
                  Success Rate
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="hidden w-1/2 justify-center lg:flex">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            alt="Learning"
            className="w-full max-w-xl rounded-3xl shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;