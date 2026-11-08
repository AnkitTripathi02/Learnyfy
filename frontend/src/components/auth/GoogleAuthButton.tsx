import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { loginWithGoogle } from "../../api/authApi";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credential: string) => {
    try {
      const response = await loginWithGoogle(credential);
      const payload = response?.data ?? response;
      const result = payload?.data ?? payload;
      const token = result?.access_token;
      const user = result?.user;

      if (!token || !user) {
        throw new Error("Invalid Google login response from server.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Google sign-in failed",
        text:
          error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error?.message ||
          "Unable to sign in with Google. Please try again.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
      });
    } finally {
      setLoading(false);
    }
  };

  const startGoogleLogin = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: (tokenResponse) => {
      void handleSuccess(tokenResponse.access_token);
    },
    onError: () => {
      setLoading(false);
      void Swal.fire({
        icon: "error",
        title: "Google sign-in failed",
        text: "Please try signing in with Google again.",
        background: "#161122",
        color: "#ffffff",
        confirmButtonColor: "#8b5cf6",
      });
    },
    onNonOAuthError: () => {
      setLoading(false);
    },
  });

  const handleClick = () => {
    if (!googleClientId || loading) return;
    setLoading(true);
    startGoogleLogin();
  };

  if (!googleClientId) {
    return (
      <button
        type="button"
        onClick={() =>
          void Swal.fire({
            icon: "warning",
            title: "Google sign-in needs setup",
            text: "Create a Google OAuth Web client, then set its client ID in frontend/.env as VITE_GOOGLE_CLIENT_ID and backend/.env as GOOGLE_CLIENT_ID. Restart both servers afterward.",
            background: "#161122",
            color: "#ffffff",
            confirmButtonColor: "#8b5cf6",
          })
        }
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-0.5 hover:border-purple-200/30 hover:bg-white/[0.07] hover:text-white"
      >
        <FcGoogle className="text-lg" />
        Continue with Google
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/15 bg-[#17141f] px-4 py-3 text-sm font-medium text-slate-100 shadow-[0_10px_28px_rgba(0,0,0,0.24)] transition duration-200 hover:-translate-y-0.5 hover:border-purple-200/35 hover:bg-[#211b2b] hover:shadow-[0_14px_32px_rgba(0,0,0,0.32)] disabled:cursor-wait disabled:opacity-70"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-purple-300/[0.06] via-transparent to-purple-300/[0.06] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
        <FcGoogle className="text-lg" />
      </span>
      <span className="relative">{loading ? "Connecting to Google..." : "Continue with Google"}</span>
      <span className="absolute right-4 h-1.5 w-1.5 rounded-full bg-purple-200/70 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
};

export default GoogleAuthButton;