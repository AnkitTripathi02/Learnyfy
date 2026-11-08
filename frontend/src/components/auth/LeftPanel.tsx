interface LeftPanelProps {
  showSignup: boolean;
}

const LeftPanel = ({ showSignup }: LeftPanelProps) => {
  return (
    <div className="relative hidden overflow-hidden pl-8 pr-6 pt-12 text-white lg:flex lg:flex-col lg:justify-center xl:pl-20 xl:pr-10 xl:pt-20">

      {/* Badge */}
      <span
        className={`my-8 inline-block w-fit rounded-full px-5 py-2 text-sm transition-all duration-700 lg:text-base ${showSignup
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
          <h1 className="text-5xl font-bold leading-[1.1] xl:text-6xl">
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
          <h1 className="text-5xl font-bold leading-[1.1] xl:text-6xl">
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
            className={`absolute max-w-md text-xl text-gray-400 transition-all duration-700 xl:text-3xl ${item.isVisible
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