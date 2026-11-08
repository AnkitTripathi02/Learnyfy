import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { signup } from "../../api/authApi";
import GoogleAuthButton from "./GoogleAuthButton";

interface SignupFormProps {
  onLogin: () => void;
}

const SignupForm = ({ onLogin }: SignupFormProps) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Full name required",
        text: "Please enter your full name.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });
      return;
    }

    if (!emailRegex.test(email)) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid email",
        text: "Please enter a valid email address.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });
      return;
    }

    if (password.length < 8) {
      await Swal.fire({
        icon: "warning",
        title: "Weak password",
        text: "Password must be at least 8 characters long.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      await Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Password and confirm password must match.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#ef4444",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });
      return;
    }

    if (!acceptTerms) {
      await Swal.fire({
        icon: "warning",
        title: "Terms required",
        text: "Please accept the terms and privacy policy before creating your account.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
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
        title: "Creating account...",
        text: "Please wait while we register your profile.",
        background: "#161122",
        color: "#ffffff",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await signup({
        full_name: fullName,
        email,
        password,
      });

      const payload = response?.data ?? response;
      const message = response?.message || payload?.message || "Account created successfully.";

      Swal.close();

      await Swal.fire({
        icon: "success",
        title: "Account created",
        text: message,
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });

      onLogin();
    } catch (error: any) {
      Swal.close();

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "Something went wrong while creating your account.";

      await Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: message,
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

  return (
    <div className="border-0 bg-transparent p-0 shadow-none">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white"
          aria-label="Go to home"
        >
          <FaBookOpen className="text-base" />
        </button>
        <span className="text-xs font-medium text-slate-400">
          Join today
        </span>
      </div>

      <div className="mb-6">
        <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">Create account</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Join Learnyfy and start your learning journey today.
        </p>
      </div>

      <div className="space-y-3.5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Full name</label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 transition focus-within:border-purple-300/60 focus-within:ring-2 focus-within:ring-purple-300/10">
            <FaUser className="text-slate-400" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 transition focus-within:border-purple-300/60 focus-within:ring-2 focus-within:ring-purple-300/10">
            <FaEnvelope className="text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 transition focus-within:border-purple-300/60 focus-within:ring-2 focus-within:ring-purple-300/10">
            <FaLock className="text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-slate-400 hover:text-white">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Confirm password</label>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 transition focus-within:border-purple-300/60 focus-within:ring-2 focus-within:ring-purple-300/10">
            <FaLock className="text-slate-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="text-slate-400 hover:text-white">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-3 text-xs text-slate-300 sm:text-sm">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 h-4 w-4 accent-purple-500"
          />
          <span>
            I agree to the Terms & Conditions and Privacy Policy.
          </span>
        </label>

        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className={`w-full rounded-xl bg-[#7954b8] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:bg-[#8964c8] ${
            loading ? "cursor-not-allowed opacity-70" : "hover:scale-[1.01]"
          }`}
        >
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        <div className="my-2 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <GoogleAuthButton />

        <p className="pt-1 text-center text-sm text-slate-400">
          Already have an account?
          <button type="button" onClick={onLogin} className="ml-2 font-medium text-purple-300 hover:text-purple-200">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;