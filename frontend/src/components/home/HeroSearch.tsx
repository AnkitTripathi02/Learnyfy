import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HeroSearch = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");


const handleSearch = () => {

    if (
        search.trim() === "" &&
        category === "" &&
        price === ""
    ) {
        Swal.fire({
            icon: "warning",
            title: "Search Required",
            html: `
                <div style="margin-top:8px">
                    <p style="
                        color:#CBD5E1;
                        font-size:16px;
                        line-height:1.6;
                        margin:0;
                    ">
                        Please enter a <b>course name</b> or select a
                        <b>category</b> or <b>price filter</b>.
                    </p>
                </div>
            `,
            background: "#0F172A",
            color: "#fff",
            width: 460,
            padding: "2rem",
            confirmButtonText: "Got it",
            confirmButtonColor: "#4F46E5",
            backdrop: `
                rgba(2,6,23,0.75)
                backdrop-filter: blur(8px)
            `,
            showClass: {
                popup: "animate__animated animate__zoomIn animate__faster",
            },
            hideClass: {
                popup: "animate__animated animate__zoomOut animate__faster",
            },
            customClass: {
                popup: "rounded-[24px]",
                confirmButton: "rounded-xl px-8 py-3 text-base font-semibold",
            },
        });

        return;
    }

    const params = new URLSearchParams();

    if (search.trim()) {
        params.set("search", search.trim());
    }

    if (category) {
        params.set("category", category);
    }

    if (price) {
        params.set("price", price);
    }

    navigate(`/courses?${params.toString()}`);
};

  return (

    <div className="rounded-2xl p-2 shadow-2xl">

      <div className="gap-2 flex w-full">


        <input
          type="text"
          placeholder="Search Course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" rounded-xl border w-1/2 border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-500 outline-none focus:border-indigo-500"
        />


        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border w-1/2 border-gray-300 bg-white px-0.5 py-3 text-gray-800 outline-none"
        >
          <option value="">
            Select
          </option>

          <option value="Programming">
            Programming
          </option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="AI">
            AI
          </option>

          <option value="Python">
            Python
          </option>

        </select>


        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-xl border border-gray-300 bg-white px-0.5 py-3 text-gray-800 outline-none"
        >
          <option value="">
            Select
          </option>

          <option value="Paid / Free">
            Paid / Free
          </option>

          <option value="Free">
            Free
          </option>

          <option value="Paid">
            Paid
          </option>

        </select>



        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white"
        >

          <FaSearch />
          Search

        </button>


      </div>

    </div>

  );

};


export default HeroSearch;