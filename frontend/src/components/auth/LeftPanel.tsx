interface LeftPanelProps {
  showSignup: boolean;
}

const LeftPanel = ({ showSignup }: LeftPanelProps) => {
  return (
    <div className="hidden lg:flex flex-col justify-start pt-24 pl-36 pr-10 text-white relative overflow-hidden">

      {/* Badge */}
      <span
        className={`inline-block px-6 py-2 my-14 rounded-full text-md w-fit transition-all duration-700 ${showSignup
            ? "bg-green-600/20 text-green-300"
            : "bg-purple-700/20 text-purple-300"
          }`}
      >
        {showSignup
          ? "🎉 Create Your Free Account"
          : "🚀 Your Learning Journey Starts Here"}
      </span>

      {/* Heading */}
      <div className="relative h-52 overflow-hidden">

        {/* Login Text */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${showSignup
              ? "-translate-y-16 opacity-0"
              : "translate-y-0 opacity-100"
            }`}
        >
          <h1 className="text-6xl font-bold leading-[1.1]">
            Learn.
            <br />
            <span className="text-purple-500">
              Practice.
            </span>
            <br />
            Grow.
          </h1>
        </div>

        {/* Signup Text */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${showSignup
              ? "translate-y-0 opacity-100"
              : "translate-y-16 opacity-0"
            }`}
        >
          <h1 className="text-6xl font-bold leading-[1.1]">
            Join.
            <br />
            <span className="text-green-400">
              Learn.
            </span>
            <br />
            Succeed.
          </h1>
        </div>

      </div>

      {/* Description */}
      <div className="relative h-24 mt-8 overflow-hidden">
        {[
          { text: "Continue your learning journey and unlock your full potential.", isVisible: !showSignup, direction: "-translate-y-10" },
          { text: "Join thousands of students already learning with LearnyFy.", isVisible: showSignup, direction: "translate-y-10" }
        ].map((item, index) => (
          <p
            key={index}
            className={`absolute transition-all duration-700 text-gray-400 text-3xl max-w-md ${item.isVisible
                ? "translate-y-0 opacity-100"
                : `${item.direction} opacity-0`
              }`}
          >
            {item.text}
          </p>
        ))}
      </div>


    </div>
  );
};

export default LeftPanel;