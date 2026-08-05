import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBookOpen,
} from "react-icons/fa";
import { useState } from "react";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSignup: () => void;
}

const LoginForm = ({ onSignup }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }

    if (value.length > 20) {
      setPasswordError("Maximum 20 characters allowed.");
      return false;
    }

    if (!/[A-Z]/.test(value)) {
      setPasswordError("At least one uppercase letter is required.");
      return false;
    }

    if (!/\d/.test(value)) {
      setPasswordError("At least one number is required.");
      return false;
    }

    if (!/[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      setPasswordError("At least one special character is required.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleLogin = async () => {

    if (!email) {
      alert("Email is required");
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    try {
      setLoading(true);

const response = await login({
  email,
  password,
});

localStorage.setItem(
  "token",
  response.data.access_token
);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

navigate("/dashboard");

    } catch (error: any) {

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#141222]/90 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
        {/* Logo */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full border border-purple-500/20 scale-125"></div>
            <div className="absolute inset-0 rounded-full border border-purple-500/10 scale-150"></div>

            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <FaBookOpen className="text-white text-xl" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-5xl font-bold text-white">
          Welcome Back! 👋
        </h2>

        <p className="text-gray-400 mt-3 text-lg">
          Login to continue your learning journey
        </p>

        {/* Email */}
        <div className="mt-10">
          <label className="text-gray-300">
            Email
          </label>

          <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#1b1a2b] px-4 focus-within:border-purple-500 transition-all">
            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent p-4 text-white outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-6">
          <label className="text-gray-300">
            Password
          </label>

          <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#1b1a2b] px-4 focus-within:border-purple-500 transition-all">
            <FaLock className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              maxLength={20}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                validatePassword(value);
              }}
              placeholder="Enter your password"
              className="
              w-full
              bg-transparent
              p-4
              text-white
              outline-none
              placeholder:text-gray-500
              autofill:bg-transparent
              [-webkit-text-fill-color:white]
              [-webkit-box-shadow:0_0_0px_1000px_#1b1a2b_inset]
            "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="cursor-pointer text-gray-400 hover:text-white" />
              ) : (
                <FaEye className="cursor-pointer text-gray-400 hover:text-white" />
              )}
            </button>
          </div>

          {passwordError && (
            <p className="mt-2 text-sm text-red-500">
              {passwordError}
            </p>
          )}
        </div>

        {/* Remember */}
        <div className="mt-6 flex items-center justify-between">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              className="accent-purple-600"
            />

            Remember me
          </label>

          <button className="text-purple-400 hover:text-purple-300 transition">
            Forgot password?
          </button>
        </div>

        {/* Login */}
        {/* <button
          // onClick={() => {
          //   if (validatePassword(password)) {
          //     console.log("Login Success");
          //   }
          // }}
          onClick={handleLogin}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
        >
          {loading ? "Logging in..." : "Log In →"}
        </button> */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
        >
          {loading ? "Logging in..." : "Log In →"}
        </button>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-700"></div>

          <span className="text-sm text-gray-500">
            or continue with
          </span>

          <div className="h-px flex-1 bg-gray-700"></div>
        </div>

        {/* Google */}
        <button className="w-full rounded-xl border border-white/10 py-4 text-white flex items-center justify-center gap-3 hover:border-purple-500 transition-all duration-300">
          <FaGoogle />
          Google
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-400">
          Don't have an account?

          <button
            type="button"
            onClick={onSignup}
            className="ml-2 text-purple-400 hover:text-purple-300 transition"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;