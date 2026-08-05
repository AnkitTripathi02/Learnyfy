import { useState } from "react";
import LeftPanel from "../components/auth/LeftPanel";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import Background from "../assets/Background.png";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-[#090817] flex p-1">
      <div
        className="relative w-full max-w-8xl rounded-xl overflow-hidden border border-purple-500/20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >


        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Animated Form Section */}
          <div className="relative overflow-hidden min-h-[900px]">

            {/* Login */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${showSignup
                  ? "-translate-x-full opacity-0 scale-95"
                  : "translate-x-0 opacity-100 scale-100"
                }`}
            >
              <LoginForm onSignup={() => setShowSignup(true)} />
            </div>

            {/* Signup */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${showSignup
                  ? "translate-x-0 opacity-100 scale-100"
                  : "translate-x-full opacity-0 scale-95"
                }`}
            >
              <SignupForm onLogin={() => setShowSignup(false)} />
            </div>

          </div>

          {/* Right Panel */}
          <LeftPanel showSignup={showSignup} />
        </div>
      </div>
    </div>
  );
};

export default Login;