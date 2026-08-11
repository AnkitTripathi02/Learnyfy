import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const faqData = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply open the course page and click the 'Enroll Now' button. Free courses are instantly available while paid courses require successful payment.",
  },
  {
    question: "Can I access my courses on mobile?",
    answer:
      "Yes. LearnyFy is fully responsive, so you can learn on desktop, tablet, or mobile devices anytime.",
  },
  {
    question: "Do I get a certificate after completion?",
    answer:
      "Yes. Once you complete all lessons and meet the course requirements, you'll receive a certificate of completion.",
  },
  {
    question: "Is Lifetime Access really lifetime?",
    answer:
      "Absolutely. Once you purchase a course, you can access it forever using your LearnyFy account.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refund requests are accepted according to our refund policy. Please contact our support team for assistance.",
  },
  {
    question: "Can I download videos?",
    answer:
      "Currently, videos are available for online streaming only to ensure content security.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach us using the Contact section on the homepage or email us at support@learnyfy.com.",
  },
  {
    question: "Are new courses added regularly?",
    answer:
      "Yes. We continuously add new industry-ready courses and update existing content with the latest technologies.",
  },
];

const Faq = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-6">

          {/* Header */}
          <div className="text-center">
            <span className="rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-600">
              Help Center
            </span>

            <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Everything you need to know about LearnyFy. Can't find your answer?
              Contact our support team anytime.
            </p>
          </div>

          {/* FAQ Cards */}
          <div className="mt-16 space-y-5">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition hover:shadow-xl"
              >
                <button
                  onClick={() =>
                    setActive(active === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <h2 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h2>

                  {active === index ? (
                    <FaChevronUp className="text-indigo-600" />
                  ) : (
                    <FaChevronDown className="text-indigo-600" />
                  )}
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    active === index
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-gray-100 px-8 py-6 leading-8 text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold">
              Still have questions?
            </h2>

            <p className="mt-4 text-indigo-100">
              Our support team is always ready to help you with any issue.
            </p>

            <a
              href="/#contact"
              className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-indigo-600 transition hover:scale-105"
            >
              Contact Support
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Faq;