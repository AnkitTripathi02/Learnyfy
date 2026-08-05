import {
  FaChalkboardTeacher,
  FaCertificate,
  FaLaptopCode,
  FaInfinity,
} from "react-icons/fa";

const features = [
  {
    title: "Expert Instructors",
    description:
      "Learn from experienced industry professionals with real-world knowledge.",
    icon: <FaChalkboardTeacher size={45} />,
  },
  {
    title: "Hands-on Projects",
    description:
      "Build practical projects to strengthen your portfolio and skills.",
    icon: <FaLaptopCode size={45} />,
  },
  {
    title: "Certificate",
    description:
      "Receive a verified certificate after successful course completion.",
    icon: <FaCertificate size={45} />,
  },
  {
    title: "Lifetime Access",
    description:
      "Access your purchased courses anytime, anywhere without limits.",
    icon: <FaInfinity size={45} />,
  },
];

const WhyChooseUs = () => {
  return (
    <section
      id="about"
      className="bg-gray-100 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose LearnyFy?
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Everything you need to become industry ready.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item, index) => (

            <div
              key={index}
              className="rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >

              <div className="flex justify-center text-indigo-600">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-500">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;