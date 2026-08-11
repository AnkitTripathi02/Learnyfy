import { useState } from "react";
// import { signup } from "../api/authApi";
import { signup } from "../../api/authApi";
// import { useNavigate } from "react-router-dom";
import {
    FaGoogle,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaBookOpen,
    FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";

interface SignupFormProps {
    onLogin: () => void;
}

const SignupForm = ({ onLogin }: SignupFormProps) => {
    // const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleSignup = async () => {
        setEmailError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!acceptTerms) {
            alert("Please accept Terms & Conditions.");
            return;
        }

        try {
            setLoading(true);

            const response = await signup({
                full_name: fullName,
                email,
                password,
            });

            alert(response.message);
            onLogin();

        } catch (error: any) {
            alert(
                error.response?.data?.message ||
                error.response?.data?.detail ||
                "Signup Failed"
            );
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
        <div className="flex h-full items-center justify-center p-10">
            <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#141222]/90 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
                {/* Logo */}
                <div className="flex justify-end">
                    <div className="relative">

                        <div className="w-10 h-7 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                            <FaBookOpen className="text-white text-md" />
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-white">
                    Create Account 🚀
                </h2>

                <p className="text-gray-400 mt-0.5 text-md">
                    Join the platform and start your learning journey.
                </p>

                {/* Full Name */}
                <div className="mt-3">
                    <label className="text-gray-300">Full Name</label>

                    <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#1b1a2b] px-2 focus-within:border-purple-500 transition">
                        <FaUser className="text-gray-400" />

                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full bg-transparent p-3 text-white outline-none placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mt-3">
                    <label className="text-gray-300">Email</label>

                    <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#1b1a2b] px-2 focus-within:border-purple-500 transition">
                        <FaEnvelope className="text-gray-400" />

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                            }}
                            placeholder="Enter your email"
                            className="w-full bg-transparent p-3 text-white outline-none placeholder:text-gray-500"
                        />

                    </div>
                    {emailError && (
                        <p className="mt-1 text-sm text-red-500">
                            {emailError}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="mt-3">
                    <label className="text-gray-300">Password</label>

                    <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#1b1a2b] px-2 focus-within:border-purple-500 transition">
                        <FaLock className="text-gray-400" />

                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
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
                                <FaEyeSlash className="text-gray-400 hover:text-white" />
                            ) : (
                                <FaEye className="text-gray-400 hover:text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="mt-3">
                    <label className="text-gray-300">Confirm Password</label>

                    <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#1b1a2b] px-2 focus-within:border-purple-500 transition">
                        <FaLock className="text-gray-400" />

                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="w-full bg-transparent p-3 text-white outline-none placeholder:text-gray-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="text-gray-400 hover:text-white" />
                            ) : (
                                <FaEye className="text-gray-400 hover:text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Terms */}
                <div className="mt-3 flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="accent-purple-600"
                    />

                    <p className="text-sm text-gray-400">
                        I agree to the Terms & Conditions and Privacy Policy
                    </p>
                </div>

                {/* Create Account */}
                <button
                    onClick={handleSignup}
                    disabled={loading || !acceptTerms}
                    className={`
                    mt-5
                    w-full
                    rounded-xl
                    py-4
                    text-lg
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    ${loading || !acceptTerms
                            ? "bg-gray-600 cursor-not-allowed opacity-60"
                            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02]"
                        }
                `}
                >
                    {loading ? "Creating Account..." : "Create Account →"}
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
                    Already have an account?

                    <button
                        type="button"
                        onClick={onLogin}
                        className="ml-2 text-purple-400 hover:text-purple-300 transition"
                    >
                        Log In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;