const SearchSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-3xl font-bold text-gray-800">
          Find Your Perfect Course
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Search courses and filter them according to your needs.
        </p>

        <div className="mt-10 rounded-2xl bg-gray-100 p-6 shadow">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <input
              type="text"
              placeholder="Search Course..."
              className="rounded-lg border p-3"
            />

            <select className="rounded-lg border p-3">
              <option>Category</option>
            </select>

            <select className="rounded-lg border p-3">
              <option>Sub Category</option>
            </select>

            <select className="rounded-lg border p-3">
              <option>Paid / Free</option>
            </select>

            <select className="rounded-lg border p-3">
              <option>Duration</option>
            </select>

            <select className="rounded-lg border p-3">
              <option>Program Type</option>
            </select>

            <select className="rounded-lg border p-3">
              <option>Partner Institution</option>
            </select>

            <button className="rounded-lg bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700">
              Search
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SearchSection;