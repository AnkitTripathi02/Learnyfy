import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import { useState } from "react";
import Swal from "sweetalert2";

import { updateMyProfile } from "../../api/profileApi";

interface Props {
  user: any;
  initials: string;
}

const ProfileInfo = ({ user, initials }: Props) => {
  const [editing, setEditing] = useState(false);

  const [fullName, setFullName] = useState(
    user.full_name || ""
  );

  const [email, setEmail] = useState(
    user.email || ""
  );

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!fullName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Full Name Required",
        text: "Please enter your full name.",
      });

      return;
    }

    if (!email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email.",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await updateMyProfile({
        full_name: fullName.trim(),
        email: email.trim(),
      });

      const updatedUser = {
        ...user,
        ...response.data,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setEditing(false);

    } catch (error: any) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.message ||
          "Unable to update profile.",
      });

    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFullName(user.full_name || "");
    setEmail(user.email || "");
    setEditing(false);
  };

  return (
    <div className="space-y-5">

      {/* Profile Header */}

      <div className="text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-3xl font-bold text-white shadow-xl">
          {initials}
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white">
          {user.full_name || "User"}
        </h2>

        <p className="mt-1 capitalize text-gray-400">
          {user.role || "Student"}
        </p>

      </div>

      {/* Full Name */}

      <div className="rounded-xl border border-white/10 text-white p-4">

        <div className="flex items-center gap-3">

          <FaUser className="text-purple-400" />

          <div className="min-w-0 flex-1">

            <p className="text-xs text-gray-500">
              Full Name
            </p>

            {editing ? (
              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-[#111021] px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
              />
            ) : (
              <p className="text-sm text-white">
                {user.full_name || "Not available"}
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Email */}

      <div className="rounded-xl border border-white/10 text-white p-4">

        <div className="flex items-center gap-3">

          <FaEnvelope className="text-blue-400" />

          <div className="min-w-0 flex-1">

            <p className="text-xs text-gray-500">
              Email
            </p>

            {editing ? (
              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-[#111021] px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
              />
            ) : (
              <p className="break-all text-sm text-white">
                {user.email || "Not available"}
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Account Type */}

      <div className="rounded-xl border border-white/10 text-white p-4">

        <div className="flex items-center gap-3">

          <FaIdBadge className="text-green-400" />

          <div>

            <p className="text-xs text-gray-500">
              Account Type
            </p>

            <p className="text-sm capitalize text-white">
              {user.role || "Student"}
            </p>

          </div>

        </div>

      </div>

      {/* Buttons */}

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white transition hover:scale-[1.01]"
        >
          <FaEdit />
          Edit Profile
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={cancelEdit}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#29263d] py-3 font-semibold text-gray-200 transition hover:bg-[#343047]"
          >
            <FaTimes />
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave />
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>
      )}

    </div>
  );
};

export default ProfileInfo;