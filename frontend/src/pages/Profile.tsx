import { useCallback, useEffect, useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaIdCard,
  FaTimes,
  FaUserCircle,
  FaSyncAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { getMyProfile } from "../api/profileApi";

interface User {
  id?: string | number;
  full_name?: string;
  email?: string;
  role?: string;
  profile_image?: string | null;
}

interface ProfileProps {
  onClose?: () => void;
}

const Profile = ({ onClose }: ProfileProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retrying, setRetrying] = useState(false);

  // =========================================================
  // LOAD REAL PROFILE
  // =========================================================

  const loadProfile = useCallback(async () => {
    try {
      setError("");

      const response = await getMyProfile();

      console.log("PROFILE RESPONSE:", response);

      /*
        Backend response:

        {
          message: "...",
          data: {
            id,
            full_name,
            email,
            role,
            profile_image
          }
        }
      */

      const profile = response?.data;

      if (!profile) {
        throw new Error("Profile data not found.");
      }

      setUser(profile);
    } catch (error: any) {
      console.error("PROFILE API ERROR:", error);

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "DATA:",
        error?.response?.data
      );

      setUser(null);

      setError(
        error?.response?.data?.detail ||
          error?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  }, []);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // =========================================================
  // ESCAPE
  // =========================================================

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  // =========================================================
  // RETRY
  // =========================================================

  const handleRetry = async () => {
    setRetrying(true);
    setLoading(true);

    await loadProfile();
  };

  // =========================================================
  // INITIALS
  // =========================================================

  const getInitials = () => {
    const name =
      user?.full_name || "User";

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // =========================================================
  // ROLE
  // =========================================================

  const role =
    user?.role?.toLowerCase() || "user";

  // =========================================================
  // DISPLAY NAME
  // =========================================================

  const displayName =
    user?.full_name || "User";

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/75
        px-4
        py-6
        backdrop-blur-md
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose?.();
        }
      }}
    >

      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#11101f]
          shadow-[0_25px_80px_rgba(0,0,0,0.55)]
          animate-[fadeIn_.2s_ease-out]
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* ===================================================
            BACKGROUND DECORATION
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-indigo-600/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            top-20
            h-56
            w-56
            rounded-full
            bg-purple-600/10
            blur-3xl
          "
        />

        {/* ===================================================
            CLOSE
        ==================================================== */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-black/20
            text-gray-400
            backdrop-blur
            transition
            hover:border-red-500/30
            hover:bg-red-500/10
            hover:text-red-400
          "
          aria-label="Close profile"
        >
          <FaTimes />
        </button>

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            relative
            border-b
            border-white/10
            px-6
            pb-7
            pt-8
            sm:px-8
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              text-center
            "
          >

            {/* AVATAR */}

            <div
              className="
                relative
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-indigo-500
                to-purple-600
                p-[3px]
                shadow-[0_0_35px_rgba(99,102,241,0.25)]
              "
            >

              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-[#151326]
                  text-3xl
                  font-bold
                  text-white
                "
              >

                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt={displayName}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  getInitials()
                )}

              </div>

              {/* ONLINE / ACTIVE */}

              {!loading && user && (
                <span
                  className="
                    absolute
                    bottom-1
                    right-2
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-[#11101f]
                    bg-green-400
                  "
                />
              )}

            </div>

            {/* NAME */}

            <h2
              className="
                mt-5
                text-2xl
                font-bold
                tracking-tight
                text-white
              "
            >
              {loading
                ? "Loading profile..."
                : displayName}
            </h2>

            {/* EMAIL */}

            {!loading && user?.email && (
              <p
                className="
                  mt-1
                  max-w-full
                  truncate
                  px-8
                  text-sm
                  text-gray-500
                "
              >
                {user.email}
              </p>
            )}

            {/* ROLE */}

            {!loading && user && (
              <div
                className="
                  mt-3
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-500/20
                  bg-indigo-500/10
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  capitalize
                  text-indigo-300
                "
              >
                <FaShieldAlt className="text-[10px]" />

                {role}

                <FaCheckCircle className="text-[10px] text-green-400" />
              </div>
            )}

          </div>

        </div>

        {/* ===================================================
            BODY
        ==================================================== */}

        <div className="px-6 py-6 sm:px-8">

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="flex flex-col items-center py-10">

              <div
                className="
                  h-11
                  w-11
                  animate-spin
                  rounded-full
                  border-2
                  border-white/10
                  border-t-indigo-500
                "
              />

              <p className="mt-4 text-sm text-gray-500">
                Fetching your account details...
              </p>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div
              className="
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/[0.04]
                p-6
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500/10
                  text-red-400
                "
              >
                <FaTimes />
              </div>

              <h3 className="mt-4 font-semibold text-white">
                Unable to load profile
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={handleRetry}
                disabled={retrying}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-indigo-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <FaSyncAlt
                  className={
                    retrying
                      ? "animate-spin"
                      : ""
                  }
                />

                {retrying
                  ? "Retrying..."
                  : "Try Again"}
              </button>

            </div>
          )}

          {/* =================================================
              PROFILE DATA
          ================================================= */}

          {!loading &&
            !error &&
            user && (
              <div className="grid gap-4 sm:grid-cols-2">

                {/* FULL NAME */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.025]
                    p-5
                    transition
                    hover:border-indigo-500/20
                    hover:bg-indigo-500/[0.04]
                  "
                >
                  <div className="flex items-start gap-4">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-500/10
                        text-indigo-400
                        transition
                        group-hover:bg-indigo-500/20
                      "
                    >
                      <FaUser />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Full Name
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-white">
                        {user.full_name || "-"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* EMAIL */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.025]
                    p-5
                    transition
                    hover:border-purple-500/20
                    hover:bg-purple-500/[0.04]
                  "
                >
                  <div className="flex items-start gap-4">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-purple-500/10
                        text-purple-400
                      "
                    >
                      <FaEnvelope />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        Email Address
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-white">
                        {user.email || "-"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* ROLE */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.025]
                    p-5
                    transition
                    hover:border-green-500/20
                    hover:bg-green-500/[0.04]
                  "
                >
                  <div className="flex items-start gap-4">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-green-500/10
                        text-green-400
                      "
                    >
                      <FaShieldAlt />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Account Role
                      </p>

                      <p className="mt-1 text-sm font-semibold capitalize text-white">
                        {user.role || "-"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* USER ID */}

                <div
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/5
                    bg-white/[0.025]
                    p-5
                    transition
                    hover:border-yellow-500/20
                    hover:bg-yellow-500/[0.04]
                  "
                >
                  <div className="flex items-start gap-4">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-yellow-500/10
                        text-yellow-400
                      "
                    >
                      <FaIdCard />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-500">
                        User ID
                      </p>

                      <p
                        className="
                          mt-1
                          truncate
                          font-mono
                          text-xs
                          font-medium
                          text-gray-300
                        "
                      >
                        {user.id || "-"}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            )}

        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        {!loading && (
          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-white/10
              px-6
              py-4
              sm:px-8
            "
          >

            <div className="flex items-center gap-2">
              <FaUserCircle className="text-gray-600" />

              <span className="text-xs text-gray-500">
                LearnyFy Account
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-gray-300
                transition
                hover:border-indigo-500/30
                hover:bg-indigo-500/10
                hover:text-white
              "
            >
              Close
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;