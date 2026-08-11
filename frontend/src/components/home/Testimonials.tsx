import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ankit Sharma",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "LearnyFy helped me improve my React and FastAPI skills. The projects were practical and interview-oriented.",
  },
  {
    name: "Priya Verma",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The UI, course quality and learning experience are amazing. I completed multiple courses with confidence.",
  },
  {
    name: "Rahul Mehta",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Hands-on projects and structured lessons made learning easy. Highly recommended for beginners and professionals.",
  },
];

const Testimonials = () => {
  return (
    <div className="px-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          What Our Students Say
        </h2>

        <p className="mt-4 text-lg text-gray-500">
          Thousands of students are growing their careers with LearnyFy.
        </p>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-300 p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-full object-cover"
              />

              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>

                <p className="text-gray-500">{item.role}</p>
              </div>
            </div>

            <div className="mt-6 flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p className="mt-6 leading-7 text-gray-600">
              "{item.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;