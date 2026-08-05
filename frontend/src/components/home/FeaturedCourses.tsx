import { Link } from "react-router-dom";
import {
  FaClock,
  FaStar,
  FaUserGraduate,
} from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "React JS Masterclass",
    instructor: "John Doe",
    duration: "12 Hours",
    price: "₹999",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=700",
  },
  {
    id: 2,
    title: "Python Complete Bootcamp",
    instructor: "Jane Smith",
    duration: "18 Hours",
    price: "Free",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=700",
  },
  {
    id: 3,
    title: "Java Programming",
    instructor: "David Wilson",
    duration: "15 Hours",
    price: "₹799",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700",
  },
  {
    id: 4,
    title: "Full Stack Development",
    instructor: "Robert Johnson",
    duration: "30 Hours",
    price: "₹1499",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700",
  },
];

const FeaturedCourses = () => {
  return (
    <section
      id="courses"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Featured Courses
          </h2>

          <p className="mt-4 text-gray-500">
            Learn from industry experts and become job ready.
          </p>

        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {courses.map((course) => (

            <div
              key={course.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <img
                src={course.image}
                alt={course.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-xl font-bold">
                  {course.title}
                </h3>

                <div className="mt-5 flex items-center gap-2 text-gray-600">
                  <FaUserGraduate />
                  {course.instructor}
                </div>

                <div className="mt-3 flex items-center gap-2 text-gray-600">
                  <FaClock />
                  {course.duration}
                </div>

                <div className="mt-3 flex items-center gap-2 text-yellow-500">
                  <FaStar />
                  {course.rating}
                </div>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-2xl font-bold text-indigo-600">
                    {course.price}
                  </span>

                  <Link
                    to={`/courses/${course.id}`}
                    className="rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
                  >
                    View
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedCourses;