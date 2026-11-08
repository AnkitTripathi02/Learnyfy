import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { login } from "../../api/authApi";
import GoogleAuthButton from "./GoogleAuthButton";

interface LoginFormProps {
  onSignup: () => void;
}

const LoginForm = ({ onSignup }: LoginFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => localStorage.getItem("rememberEmail") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(localStorage.getItem("rememberEmail")));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("rememberEmail", email);
    }
  }, [email, rememberMe]);

  const handleLogin = async () => {
    if (!email.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Email required",
        text: "Please enter your email address.",
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

    if (!password.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Password required",
        text: "Please enter your password.",
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
        title: "Signing in...",
        text: "Please wait while we verify your account.",
        background: "#161122",
        color: "#ffffff",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await login({ email, password });
      const payload = response?.data ?? response;
      const token = payload?.access_token ?? payload?.data?.access_token;
      const user = payload?.user ?? payload?.data?.user;

      if (!token || !user) {
        throw new Error("Invalid login response from server.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      Swal.close();

      await Swal.fire({
        icon: "success",
        title: "Login successful",
        text: `Welcome back, ${user.full_name}!`,
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-6 py-3",
        },
      });

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      Swal.close();

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "Invalid email or password.";

      await Swal.fire({
        icon: "error",
        title: "Login failed",
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
      <div className="mb-7 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white"
          aria-label="Go to home"
        >
          <FaBookOpen className="text-base" />
        </button>
        <span className="text-xs font-medium text-slate-400">
          Welcome back
        </span>
      </div>

      <div className="mb-7">
        <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">Welcome back</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Login to continue your learning journey.
        </p>
      </div>

      <div className="space-y-4">
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
              placeholder="Enter your password"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-slate-400 hover:text-white">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs text-slate-300 sm:text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-purple-500"
            />
            Remember me
          </label>

          <button type="button" className="text-purple-300 transition hover:text-purple-200">
            Forgot password?
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className={`w-full rounded-xl bg-[#7954b8] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:bg-[#8964c8] ${
            loading ? "cursor-not-allowed opacity-70" : "hover:scale-[1.01]"
          }`}
        >
          {loading ? "Logging in..." : "Log In →"}
        </button>

        <div className="my-3 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <GoogleAuthButton />

        <p className="pt-1 text-center text-sm text-slate-400">
          Don’t have an account?
          <button type="button" onClick={onSignup} className="ml-2 font-medium text-purple-300 hover:text-purple-200">
            Create account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;