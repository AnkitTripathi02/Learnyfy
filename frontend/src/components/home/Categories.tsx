import {
  FaCode,
  FaReact,
  FaPython,
  FaJava,
} from "react-icons/fa";

import {
  SiMysql,
  SiMongodb,
  SiJavascript,
  SiDocker,
} from "react-icons/si";

const categories = [
  {
    title: "Web Development",
    icon: <FaCode size={40} />,
    courses: "35 Courses",
  },
  {
    title: "React",
    icon: <FaReact size={40} />,
    courses: "18 Courses",
  },
  {
    title: "Python",
    icon: <FaPython size={40} />,
    courses: "22 Courses",
  },
  {
    title: "Java",
    icon: <FaJava size={40} />,
    courses: "15 Courses",
  },
  {
    title: "JavaScript",
    icon: <SiJavascript size={40} />,
    courses: "20 Courses",
  },
  {
    title: "MySQL",
    icon: <SiMysql size={40} />,
    courses: "12 Courses",
  },
  {
    title: "MongoDB",
    icon: <SiMongodb size={40} />,
    courses: "10 Courses",
  },
  {
    title: "Docker",
    icon: <SiDocker size={40} />,
    courses: "8 Courses",
  },
];

const Categories = () => {
  return (
    <section
      id="categories"
      className="bg-gray-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-gray-800">
            Popular Categories
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Choose your favorite technology and start learning today.
          </p>

        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((item, index) => (

            <div
              key={index}
              className="group rounded-2xl bg-white p-8 text-center shadow transition duration-300 hover:-translate-y-2 hover:bg-indigo-600 hover:text-white hover:shadow-xl"
            >

              <div className="flex justify-center text-indigo-600 transition group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-500 group-hover:text-indigo-100">
                {item.courses}
              </p>

              <button className="mt-6 rounded-lg border border-indigo-600 px-5 py-2 font-medium text-indigo-600 transition hover:bg-white hover:text-indigo-600 group-hover:border-white group-hover:text-white">
                Explore
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;