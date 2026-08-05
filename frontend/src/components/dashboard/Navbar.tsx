import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <header className="h-20 border-b border-white/10 bg-[#141222] flex items-center justify-between px-8">

      {/* Search */}

      <div className="relative w-96">

        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

        <input
          type="text"
          placeholder="Search courses..."
          className="w-full rounded-xl bg-[#1b1a2b] py-3 pl-11 pr-4 text-white outline-none border border-transparent focus:border-purple-500"
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">

        {/* Notification */}

        <button className="relative">

          <FaBell className="text-2xl text-gray-300 hover:text-white transition" />

          <span className="absolute -top-2 -right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">

            <FaUserCircle className="text-2xl text-white" />

          </div>

          <div>

            <h3 className="text-white font-semibold">
              {user.full_name}
            </h3>

            <p className="text-sm text-gray-400 capitalize">
              {user.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;