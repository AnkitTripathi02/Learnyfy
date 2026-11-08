import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import Background from "../assets/Background.png";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">
    (location.pathname === "/signup" ? "signup" : "login");

  useEffect(() => {
    setMode(location.pathname === "/signup" ? "signup" : "login");
  }, [location.pathname]);

  const switchToLogin = () => {
    setMode("login");
    navigate("/login");
  };

  const switchToSignup = () => {
    setMode("signup");
    navigate("/signup");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090817] text-white">
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_30%)]" />

        <div className="auth-screen-inner relative mx-auto flex min-h-screen max-w-7xl items-start justify-center px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
          <div className="grid w-full min-w-0 max-w-6xl overflow-hidden rounded-[30px] border border-white/10 bg-[#0c0a12]/90 shadow-[0_24px_100px_rgba(0,0,0,0.48)] backdrop-blur-2xl lg:grid-cols-[1.1fr_0.9fr]">
            <aside className="relative hidden min-w-0 overflow-hidden border-r border-white/10 bg-black/10 p-8 lg:flex lg:flex-col lg:justify-between xl:p-12">
              <div>
                <div className="mb-12 inline-flex items-center gap-3 text-sm font-medium text-slate-200">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <span className="h-2 w-2 rounded-full bg-purple-300" />
                  </span>
                  Learnyfy
                </div>

                <div className="space-y-5">
                  <div className="font-serif text-5xl font-medium leading-[0.98] xl:text-7xl">
                    Learn.
                    <span className="block text-[#c5a5ff]">Practice.</span>
                    <span className="block text-white">Grow.</span>
                  </div>

                  <p className="max-w-md text-base leading-7 text-slate-300 xl:text-lg">
                    Continue your learning journey and unlock your full potential with guided courses, progress tracking, and a growth-focused community.
                  </p>
                </div>
              </div>

              <div className="relative mt-10 border-t border-white/10 pt-6">
                <p className="mb-3 text-xs font-medium text-[#c5a5ff]">
                  Learning, made clearer
                </p>
                <p className="max-w-sm font-serif text-2xl leading-snug text-white xl:text-3xl">
                  Build skills with a path that keeps you moving.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                  <span>Guided courses</span>
                  <span>Progress tracking</span>
                  <span>Certificates</span>
                </div>
              </div>
            </aside>

            <div className="flex min-w-0 items-center justify-center p-5 sm:p-8 lg:p-10">
              <div className="w-full min-w-0 max-w-md">
                <div className="mb-7 flex rounded-xl border border-white/10 bg-black/20 p-1">
                  {[
                    { key: "login", label: "Login" },
                    { key: "signup", label: "Sign Up" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => (key === "login" ? switchToLogin() : switchToSignup())}
                      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                        mode === key
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {mode === "login" ? (
                  <LoginForm onSignup={switchToSignup} />
                ) : (
                  <SignupForm onLogin={switchToLogin} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;