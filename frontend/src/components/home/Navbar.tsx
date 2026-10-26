import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import Profile from "../../pages/Profile";

import {
  FaGraduationCap,
  FaChevronDown,
  FaUserCircle,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import Swal from "sweetalert2";

import { getMyProfile } from "../../api/profileApi";

interface User {
  id?: string | number;
  full_name?: string;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  profile_image?: string | null;
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [user, setUser] = useState<User | null>(null);

  const [openProfileModal, setOpenProfileModal] =
    useState(false);

  const [openProfile, setOpenProfile] =
    useState(false);

  const [loadingUser, setLoadingUser] =
    useState(true);

  // =========================================================
  // LOAD REAL LOGGED-IN USER
  // =========================================================

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const token =
        localStorage.getItem("token");

      const storedUser =
        localStorage.getItem("user");

      // -----------------------------------------
      // NOT LOGGED IN
      // -----------------------------------------

      if (!token) {
        if (mounted) {
          setUser(null);
          setLoadingUser(false);
        }

        return;
      }

      // -----------------------------------------
      // TEMPORARY INITIAL USER
      // -----------------------------------------
      // This is only used while API loads.
      // Actual profile comes from backend.
      // -----------------------------------------

      if (storedUser) {
        try {
          const parsedUser =
            JSON.parse(storedUser);

          if (mounted) {
            setUser(parsedUser);
          }
        } catch {
          localStorage.removeItem("user");
        }
      }

      // -----------------------------------------
      // FETCH REAL PROFILE
      // -----------------------------------------

      try {
        const response =
          await getMyProfile();

        const profile =
          response?.data?.data ||
          response?.data;

        if (!mounted) {
          return;
        }

        if (profile) {
          setUser(profile);

          // Keep localStorage synchronized
          localStorage.setItem(
            "user",
            JSON.stringify(profile)
          );
        }
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        /*
         * Don't immediately remove token here.
         * ProtectedRoute/API interceptor should
         * handle expired authentication.
         */
      } finally {
        if (mounted) {
          setLoadingUser(false);
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  // =========================================================
  // CLOSE DROPDOWN WHEN ROUTE CHANGES
  // =========================================================

  useEffect(() => {
    setOpenProfile(false);
  }, [location.pathname]);

  // =========================================================
  // HOME SECTION NAVIGATION
  // =========================================================

  const goToSection = (
    section: string
  ) => {
    if (location.pathname === "/") {
      const element =
        document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate(`/#${section}`);
  };

  // =========================================================
  // USER ROLE
  // =========================================================

  const userRole =
    user?.role?.toLowerCase() || "";

  const isAdmin =
    userRole === "admin";

  // =========================================================
  // DISPLAY NAME
  // =========================================================

  const displayName =
    user?.full_name ||
    user?.name ||
    user?.username ||
    "User";

  // =========================================================
  // INITIALS
  // =========================================================

  const getInitials = () => {
    if (!displayName) {
      return "U";
    }

    return displayName
      .split(" ")
      .filter(Boolean)
      .map(
        (word) => word[0]
      )
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // =========================================================
  // DASHBOARD
  // =========================================================

  const goToDashboard = () => {
    setOpenProfile(false);

    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  // =========================================================
  // PROFILE
  // =========================================================

  const goToProfile = () => {
    setOpenProfile(false);

    navigate("/profile");
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    setOpenProfile(false);

    const result =
      await Swal.fire({
        icon: "question",
        title: "Logout?",
        text: "Are you sure you want to logout?",
        background: "#161122",
        color: "#ffffff",

        showCancelButton: true,

        confirmButtonText:
          "Yes, Logout",

        cancelButtonText:
          "Cancel",

        confirmButtonColor:
          "#dc2626",

        cancelButtonColor:
          "#374151",

        reverseButtons: true,
      });

    if (!result.isConfirmed) {
      return;
    }

    // -----------------------------------------
    // CLEAR AUTH
    // -----------------------------------------

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");

    // -----------------------------------------
    // UPDATE UI IMMEDIATELY
    // -----------------------------------------

    setUser(null);

    await Swal.fire({
      icon: "success",
      title: "Logged Out!",
      text: "You have been logged out successfully.",
      background: "#161122",
      color: "#ffffff",

      timer: 1400,
      showConfirmButton: false,
    });

    navigate("/");
  };

  // =========================================================
  // CLOSE DROPDOWN OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target =
        event.target as HTMLElement;

      if (
        !target.closest(
          "[data-profile-menu]"
        )
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <header
        className="
        fixed
        left-0
        right-0
        top-0
        z-50
        border-b
        border-white/10
        bg-[#090817]/90
        backdrop-blur-xl
      "
      >
        <div
          className="
          mx-auto
          flex
          h-20
          max-w-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
        >

          {/* =====================================================
            LOGO
        ====================================================== */}

          <Link
            to="/"
            className="
            flex
            items-center
            gap-2
            text-2xl
            font-bold
            text-indigo-500
            transition
            hover:text-indigo-400
          "
          >
            <FaGraduationCap
              className="text-3xl"
            />

            <span>LearnyFy</span>
          </Link>

          {/* =====================================================
            MENU
        ====================================================== */}

          <nav
            className="
            hidden
            items-center
            gap-8
            md:flex
          "
          >

            <Link
              to="/"
              className="
              font-medium
              text-gray-200
              transition
              hover:text-indigo-400
            "
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() =>
                goToSection("categories")
              }
              className="
              font-medium
              text-gray-200
              transition
              hover:text-indigo-400
            "
            >
              Categories
            </button>

            <Link
              to="/courses"
              className="
              font-medium
              text-gray-200
              transition
              hover:text-indigo-400
            "
            >
              Courses
            </Link>

            <button
              type="button"
              onClick={() =>
                goToSection("about")
              }
              className="
              font-medium
              text-gray-200
              transition
              hover:text-indigo-400
            "
            >
              About
            </button>

            <button
              type="button"
              onClick={() =>
                goToSection("contact")
              }
              className="
              font-medium
              text-gray-200
              transition
              hover:text-indigo-400
            "
            >
              Contact
            </button>

          </nav>

          {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

          <div className="flex items-center">

            {/* ===================================================
              LOADING USER
          ==================================================== */}

            {loadingUser ? (
              <div
                className="
                h-10
                w-28
                animate-pulse
                rounded-xl
                bg-white/10
              "
              />
            ) : !user ? (

              /* =================================================
                 LOGGED OUT
              ================================================== */

              <div className="flex items-center gap-3">

                <Link
                  to="/login"
                  className="
                  rounded-xl
                  border
                  border-indigo-600
                  px-5
                  py-2
                  font-semibold
                  text-indigo-400
                  transition
                  hover:bg-indigo-600
                  hover:text-white
                "
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="
                  hidden
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-2
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-indigo-500
                  sm:block
                "
                >
                  Sign Up
                </Link>

              </div>

            ) : (

              /* =================================================
                 LOGGED IN
              ================================================== */

              <div
                className="relative"
                data-profile-menu
              >

                {/* PROFILE BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    setOpenProfile(
                      (prev) => !prev
                    )
                  }
                  className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-2
                  py-1.5
                  transition
                  hover:border-indigo-500/40
                  hover:bg-white/[0.08]
                "
                >

                  {/* AVATAR */}

                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt={displayName}
                      className="
                      h-10
                      w-10
                      rounded-full
                      object-cover
                    "
                    />
                  ) : (
                    <div
                      className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-indigo-500
                      to-purple-600
                      text-sm
                      font-bold
                      text-white
                      shadow-lg
                    "
                    >
                      {getInitials()}
                    </div>
                  )}

                  {/* USER INFO */}

                  <div
                    className="
                    hidden
                    text-left
                    sm:block
                  "
                  >
                    <p
                      className="
                      max-w-[130px]
                      truncate
                      text-sm
                      font-semibold
                      text-white
                    "
                    >
                      {displayName}
                    </p>

                    <p
                      className="
                      text-[11px]
                      capitalize
                      text-gray-400
                    "
                    >
                      {userRole}
                    </p>
                  </div>

                  <FaChevronDown
                    className={`
                    mr-1
                    text-xs
                    text-gray-400
                    transition-transform
                    duration-200
                    ${openProfile
                        ? "rotate-180"
                        : ""
                      }
                  `}
                  />

                </button>

                {/* =================================================
                  DROPDOWN
              ================================================== */}

                {openProfile && (
                  <div
                    className="
                    absolute
                    right-0
                    top-14
                    w-72
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#151326]
                    shadow-2xl
                  "
                  >

                    {/* USER HEADER */}

                    <div
                      className="
                      border-b
                      border-white/10
                      bg-white/[0.02]
                      px-4
                      py-4
                    "
                    >
                      <div className="flex items-center gap-3">

                        {user.profile_image ? (
                          <img
                            src={
                              user.profile_image
                            }
                            alt={
                              displayName
                            }
                            className="
                            h-12
                            w-12
                            rounded-full
                            object-cover
                          "
                          />
                        ) : (
                          <div
                            className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-indigo-500
                            to-purple-600
                            font-bold
                            text-white
                          "
                          >
                            {getInitials()}
                          </div>
                        )}

                        <div className="min-w-0">

                          <p
                            className="
                            truncate
                            text-sm
                            font-semibold
                            text-white
                          "
                          >
                            {displayName}
                          </p>

                          <p
                            className="
                            truncate
                            text-xs
                            text-gray-500
                          "
                          >
                            {user.email}
                          </p>

                          <span
                            className="
                            mt-1
                            inline-block
                            rounded-full
                            bg-indigo-500/10
                            px-2
                            py-0.5
                            text-[10px]
                            font-medium
                            capitalize
                            text-indigo-400
                          "
                          >
                            {userRole}
                          </span>

                        </div>

                      </div>
                    </div>

                    {/* MENU */}

                    <div className="p-2">

                      {/* DASHBOARD */}

                      <button
                        type="button"
                        onClick={
                          goToDashboard
                        }
                        className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        text-gray-300
                        transition
                        hover:bg-indigo-500/10
                        hover:text-white
                      "
                      >
                        <FaTachometerAlt
                          className="text-indigo-400"
                        />

                        <div>
                          <p className="font-medium">
                            {isAdmin
                              ? "Admin Dashboard"
                              : "My Dashboard"}
                          </p>

                          <p className="text-[11px] text-gray-500">
                            {isAdmin
                              ? "Manage LearnyFy"
                              : "Track your learning"}
                          </p>
                        </div>
                      </button>

                      {/* PROFILE */}

                      {/* <button
                      type="button"
                      onClick={
                        goToProfile
                      }
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        text-gray-300
                        transition
                        hover:bg-indigo-500/10
                        hover:text-white
                      "
                    >
                      <FaUserCircle
                        className="text-indigo-400"
                      />

                      <div>
                        <p className="font-medium">
                          My Profile
                        </p>

                        <p className="text-[11px] text-gray-500">
                          View and edit your profile
                        </p>
                      </div>
                    </button> */}

                      <button
                        type="button"
                        onClick={() => {
                          setOpenProfile(false);
                          setOpenProfileModal(true);
                        }}
                        className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        text-gray-300
                        transition
                        hover:bg-indigo-500/10
                        hover:text-white
                      "
                      >
                        <FaUserCircle className="text-indigo-400" />
                        <div>
                          <p className="font-medium">
                            My Profile
                          </p>

                          <p className="text-[11px] text-gray-500">
                            View and edit your profile
                          </p>
                        </div>
                      </button>
                      <div
                        className="
                        my-2
                        border-t
                        border-white/10
                      "
                      />

                      {/* LOGOUT */}

                      <button
                        type="button"
                        onClick={
                          handleLogout
                        }
                        className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        text-sm
                        text-red-400
                        transition
                        hover:bg-red-500/10
                        hover:text-red-300
                      "
                      >
                        <FaSignOutAlt />

                        <span>
                          Logout
                        </span>
                      </button>

                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      </header>
      {openProfileModal && (
        <Profile
          onClose={() => setOpenProfileModal(false)}
        />
      )}
    </>
  );

};


export default Navbar;