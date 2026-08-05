import { FaSearch } from "react-icons/fa";

const HeroSearch = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-2xl">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

        {/* Search */}

        <input
          type="text"
          placeholder="Search Course..."
          className="col-span-2 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500"
        />

        {/* Category */}

        <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500">
          <option>Category</option>
          <option>Programming</option>
          <option>Web Development</option>
          <option>AI</option>
          <option>Python</option>
        </select>

        {/* Pricing */}

        <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500">
          <option>Paid / Free</option>
          <option>Free</option>
          <option>Paid</option>
        </select>

        {/* Button */}

        <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
          <FaSearch />
          Search
        </button>

      </div>
    </div>
  );
};

export default HeroSearch;