import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBookOpen,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

interface LoginFormProps {
  onSignup: () => void;
}

const LoginForm = ({ onSignup }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // useEffect(() => {
  //   const savedEmail = localStorage.getItem("rememberEmail");

  //   if (savedEmail) {
  //     setEmail(savedEmail);
  //     setRememberMe(true);
  //   }
  // }, []);

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
    // Email Validation
    if (!email.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#6366f1",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });

      return;
    }

    // Password Validation
    if (!validatePassword(password)) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Password",
        text: passwordError || "Please enter a valid password.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#6366f1",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });

      return;
    }

try {
  setLoading(true);

  Swal.fire({
    title: "Signing In...",
    text: "Please wait while we verify your credentials.",
    background: "#161122",
    color: "#ffffff",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const response = await login({
    email,
    password,
  });

  // Save Token
  localStorage.setItem(
    "token",
    response.data.access_token
  );

  // Save User
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  // Remember Email
  if (rememberMe) {
    localStorage.setItem("rememberEmail", email);
  } else {
    localStorage.removeItem("rememberEmail");
  }

  // Close Loading
  Swal.close();

  await Swal.fire({
    icon: "success",
    title: "Login Successful 🎉",
    text: `Welcome back, ${response.data.user.full_name}!`,
    background: "#161122",
    color: "#ffffff",
    confirmButtonColor: "#6366f1",
    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-xl px-6 py-3",
    },
  });

  // ===== RESET FORM =====
  setEmail("");
  setPassword("");
  setPasswordError("");
  setShowPassword(false);

  if (!rememberMe) {
    setRememberMe(false);
  }

  // ===== REDIRECT =====
  if (response.data.user.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/dashboard");
  }

} catch (error: any) {
  Swal.fire({
    icon: "error",
    title: "Login Failed",
    text:
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      "Invalid email or password.",
    background: "#161122",
    color: "#ffffff",
    confirmButtonColor: "#ef4444",
    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-xl px-6 py-3",
    },
  });
} finally {
  setLoading(false);
}
  };

  const handleGoogleLogin = async () => {
    await Swal.fire({
      icon: "info",
      title: "Google Login Coming Soon 🚀",
      text: "We're working on Google Sign-In. It will be available in the next update.",
      background: "#161122",
      color: "#ffffff",
      confirmButtonText: "Got it",
      confirmButtonColor: "#6366f1",
      backdrop: `
      rgba(0,0,0,0.7)
      blur(8px)
    `,
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-xl px-6 py-3",
      },
    });
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#141222]/90 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(139,92,246,0.15)]">

        {/* Logo */}
        <div className="flex justify-between mb-6">
          <div className="relative">
            {/* <div className="absolute inset-0 rounded-full border border-purple-500/20 scale-125"></div>
            <div className="absolute inset-0 rounded-full border border-purple-500/10 scale-150"></div> */}

            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
              <button onClick={() => navigate("/")}>
                <FaBookOpen className="text-white text-md" />
              </button>

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

          <div className="mt-2 flex items-center rounded-xl border border-white/10 text-white px-4 focus-within:border-purple-500 transition-all">
            <FaEnvelope className="text-gray-400" />

            {/* <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent p-4 text-white outline-none placeholder:text-gray-500"
            /> */}
          <input
  type="email"
  name="login_email"
  autoComplete="off"
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

          <div className="mt-2 flex items-center rounded-xl border border-white/10 text-white px-4 focus-within:border-purple-500 transition-all">
            <FaLock className="text-gray-400" />

<input
  type={showPassword ? "text" : "password"}
  name="login_password"
  placeholder="Enter Password"
  autoComplete="new-password"
  value={password}
  maxLength={20}
  onChange={(e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  }}
  className="w-full bg-transparent p-4 text-white outline-none placeholder:text-gray-500 caret-purple-500"
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
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-purple-500"
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
          className={`mt-8 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white transition-all duration-300
${
  loading
    ? "opacity-70 cursor-not-allowed"
    : "hover:scale-[1.02]"
}`}
        >
          {loading ? "Logging in..." : "Log In →"}
        </button> */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`mt-8 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white transition-all duration-300
${loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:scale-[1.02]"
            }`}
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
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-xl border border-white/10 py-4 text-white flex items-center justify-center gap-3 hover:border-purple-500 hover:bg-white/5 transition-all duration-300"
        >
          <FaGoogle className="text-xl text-red-400" />
          Continue with Google
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