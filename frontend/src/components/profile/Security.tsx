import { useState } from "react";
import { updatePassword } from "../../api/passwordApi";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Security = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateCurrentPassword = (value: string) => {
    setCurrentPassword(value);

    if (!value.trim()) {
      setCurrentPasswordError("Current password is required.");
    } else {
      setCurrentPasswordError("");
    }
  };

  const validateNewPassword = (value: string) => {
    setNewPassword(value);

    if (!value.trim()) {
      setNewPasswordError("New password is required.");
      return;
    }

    if (value.length > 20) {
      setNewPasswordError("Maximum 20 characters allowed.");
      return;
    }

    if (!/[A-Z]/.test(value)) {
      setNewPasswordError(
        "At least one uppercase letter is required."
      );
      return;
    }

    if (!/\d/.test(value)) {
      setNewPasswordError(
        "At least one number is required."
      );
      return;
    }

    if (!/[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      setNewPasswordError(
        "At least one special character is required."
      );
      return;
    }

    setNewPasswordError("");

    // Confirm password ko bhi check karo
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError(
        "New password and confirm password do not match."
      );
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPassword(value);

    if (!value.trim()) {
      setConfirmPasswordError("Please confirm your password.");
      return;
    }

    if (value !== newPassword) {
      setConfirmPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    setConfirmPasswordError("");
  };

//   const handleUpdatePassword = () => {
//     validateCurrentPassword(currentPassword);
//     validateNewPassword(newPassword);
//     validateConfirmPassword(confirmPassword);

//     if (
//       !currentPassword.trim() ||
//       !newPassword.trim() ||
//       !confirmPassword.trim() ||
//       currentPasswordError ||
//       newPasswordError ||
//       confirmPasswordError ||
//       newPassword !== confirmPassword
//     ) {
//       return;
//     }

//     console.log("Password validation successful");
//   };

const handleUpdatePassword = async () => {
  // Clear old backend error
  setCurrentPasswordError("");

  // Frontend validation
  let hasError = false;

  if (!currentPassword.trim()) {
    setCurrentPasswordError(
      "Current password is required."
    );
    hasError = true;
  }

  if (!newPassword.trim()) {
    setNewPasswordError(
      "New password is required."
    );
    hasError = true;
  }

  if (!confirmPassword.trim()) {
    setConfirmPasswordError(
      "Please confirm your password."
    );
    hasError = true;
  }

  if (newPassword !== confirmPassword) {
    setConfirmPasswordError(
      "New password and confirm password do not match."
    );
    hasError = true;
  }

  if (newPasswordError) {
    hasError = true;
  }

  if (hasError) {
    return;
  }

try {
  setLoading(true);

  await updatePassword({
    current_password: currentPassword,
    new_password: newPassword,
  });

  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");

  setCurrentPasswordError("");
  setNewPasswordError("");
  setConfirmPasswordError("");

  await Swal.fire({
    icon: "success",
    title: "Password Updated 🎉",
    text: "Your password has been updated successfully.",
    background: "#161122",
    color: "#ffffff",
    confirmButtonColor: "#6366f1",
    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-xl px-6 py-3",
    },
  });

} catch (error: any) {
  const detail = error?.response?.data?.detail;

  if (detail === "Current password is incorrect.") {
    setCurrentPasswordError(detail);
  } else {
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text:
        detail ||
        "Something went wrong while updating your password.",
      background: "#161122",
      color: "#ffffff",
      confirmButtonColor: "#ef4444",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-xl px-6 py-3",
      },
    });
  }
} finally {
  setLoading(false);
}
};
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
            <FaShieldAlt />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Security
            </h2>

            <p className="text-sm text-gray-500">
              Keep your account secure
            </p>
          </div>

        </div>
      </div>

      {/* Current Password */}
      <div className="rounded-xl border border-white/10 text-white p-4">

        <label className="mb-2 block text-sm text-gray-400">
          Current Password
        </label>

        <div className="relative">

          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            autoComplete="new-password"
            placeholder="Enter current password"
            onChange={(e) =>
              validateCurrentPassword(e.target.value)
            }
            className={`w-full rounded-xl border ${
              currentPasswordError
                ? "border-red-500"
                : "border-white/10"
            } bg-[#111021] py-3 pl-11 pr-12 text-white outline-none focus:border-purple-500`}
          />

          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            {showCurrent ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {currentPasswordError && (
          <p className="mt-2 text-sm text-red-500">
            {currentPasswordError}
          </p>
        )}

      </div>

      {/* New Password */}
      <div>

        <label className="mb-2 block text-sm text-gray-400">
          New Password
        </label>

        <div className="relative">

          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            autoComplete="new-password"
            placeholder="Enter new password"
            onChange={(e) =>
              validateNewPassword(e.target.value)
            }
            className={`w-full rounded-xl border ${
              newPasswordError
                ? "border-red-500"
                : "border-white/10"
            } text-white py-3 pl-11 pr-12 text-white outline-none focus:border-purple-500`}
          />

          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {newPasswordError && (
          <p className="mt-2 text-sm text-red-500">
            {newPasswordError}
          </p>
        )}

      </div>

      {/* Confirm Password */}
      <div>

        <label className="mb-2 block text-sm text-gray-400">
          Confirm Password
        </label>

        <div className="relative">

          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            autoComplete="new-password"
            placeholder="Confirm new password"
            onChange={(e) =>
              validateConfirmPassword(e.target.value)
            }
            className={`w-full rounded-xl border ${
              confirmPasswordError
                ? "border-red-500"
                : "border-white/10"
            } text-white py-3 pl-11 pr-12 text-white outline-none focus:border-purple-500`}
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {confirmPasswordError && (
          <p className="mt-2 text-sm text-red-500">
            {confirmPasswordError}
          </p>
        )}

      </div>

      {/* Update Button */}
<button
  type="button"
  onClick={handleUpdatePassword}
  disabled={loading}
  className={`w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white transition ${
    loading
      ? "cursor-not-allowed opacity-70"
      : "hover:scale-[1.01]"
  }`}
>
  {loading ? "Updating Password..." : "Update Password"}
</button>

    </div>
  );
};

export default Security;