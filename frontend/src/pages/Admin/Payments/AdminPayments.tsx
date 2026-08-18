import { useEffect, useMemo, useState } from "react";
import {
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaEye,
} from "react-icons/fa";

import axiosInstance from "../../../api/axiosInstance";

interface Payment {
  id: number;
  user_id: string;
  user_name: string;
  user_email: string;
  course_id: string;
  course_title: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/payments/admin");

      setPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        payment.user_name?.toLowerCase().includes(searchText) ||
        payment.user_email?.toLowerCase().includes(searchText) ||
        payment.course_title?.toLowerCase().includes(searchText) ||
        payment.razorpay_order_id?.toLowerCase().includes(searchText) ||
        payment.razorpay_payment_id
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        payment.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const totalPayments = payments.length;

  const successfulPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "paid"
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status.toLowerCase() === "created"
  );

  const totalRevenue = successfulPayments.reduce(
    (total, payment) => total + Number(payment.amount),
    0
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-500/15 text-green-400 border border-green-500/25";

      case "created":
      case "pending":
        return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25";

      case "failed":
        return "bg-red-500/15 text-red-400 border border-red-500/25";

      default:
        return "bg-white/10 text-white/60 border border-white/10";
    }
  };

  const getStatusText = (status: string) => {
    const normalizedStatus = status.toLowerCase();

    if (
      normalizedStatus === "created" ||
      normalizedStatus === "pending"
    ) {
      return "Pending";
    }

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1).toLowerCase()
    );
  };

  return (
    <div className="h-[833px] bg-[#1c1431] p-6 text-white">

      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white/90">
          Payment Management
        </h1>

        <p className="mt-1 text-sm text-white/45">
          Manage and monitor all course payments
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* Total Revenue */}
        <div className="rounded-xl border border-white/10 bg-[#1c1930] p-5 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-white/50">
                Total Revenue
              </p>

              <h2 className="mt-2 text-2xl font-bold text-green-400">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <FaCreditCard size={24} />
            </div>

          </div>
        </div>

        {/* Total Payments */}
        <div className="rounded-xl border border-white/10 bg-[#1c1930] p-5 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-white/50">
                Total Payments
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white/85">
                {totalPayments}
              </h2>
            </div>

            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
              <FaCreditCard size={24} />
            </div>

          </div>
        </div>

        {/* Successful */}
        <div className="rounded-xl border border-white/10 bg-[#1c1930] p-5 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-white/50">
                Successful
              </p>

              <h2 className="mt-2 text-2xl font-bold text-green-400">
                {successfulPayments.length}
              </h2>
            </div>

            <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
              <FaCheckCircle size={24} />
            </div>

          </div>
        </div>

        {/* Pending */}
        <div className="rounded-xl border border-white/10 bg-[#1c1930] p-5 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-white/50">
                Pending
              </p>

              <h2 className="mt-2 text-2xl font-bold text-yellow-400">
                {pendingPayments.length}
              </h2>
            </div>

            <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400">
              <FaClock size={24} />
            </div>

          </div>
        </div>

      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="mt-7 rounded-xl border border-white/10 bg-[#1c1930] p-4 shadow-lg shadow-black/10">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          {/* Search */}
          <div className="relative w-full md:w-[380px]">

            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
              size={14}
            />

            <input
              type="text"
              placeholder="Search user, course or payment ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-white/10
                bg-[#222133]
                py-3
                pl-11
                pr-4
                text-sm
                text-white
                placeholder:text-white/30
                outline-none
                transition
                focus:border-purple-500/50
                focus:ring-2
                focus:ring-purple-500/10
              "
            />

          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              rounded-lg
              border
              border-white/10
              bg-[#222133]
              px-4
              py-3
              text-sm
              text-white/75
              outline-none
              transition
              focus:border-purple-500/50
              focus:ring-2
              focus:ring-purple-500/10
            "
          >
            <option
              value="all"
              className="bg-[#222133] text-white"
            >
              All Status
            </option>

            <option
              value="paid"
              className="bg-[#222133] text-white"
            >
              Paid
            </option>

            <option
              value="created"
              className="bg-[#222133] text-white"
            >
              Pending
            </option>

            <option
              value="failed"
              className="bg-[#222133] text-white"
            >
              Failed
            </option>
          </select>

        </div>
      </div>

      {/* ================= PAYMENT TABLE ================= */}
      <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#1c1930] shadow-lg shadow-black/10">

        <div className="max-h-[525px] overflow-y-auto">

          <table className="min-w-full border-collapse">

            {/* TABLE HEADER */}
            <thead className="sticky top-0 z-20 bg-[#3b2f58]">

              <tr className="border-b border-white/10">

                <th className="px-14 py-4 text-left text-sm font-bold uppercase tracking-wider text-white">
                  User
                </th>

                <th className="px-11 py-4 text-left text-sm font-bold uppercase tracking-wider text-white">
                  Course
                </th>

                <th className="px-3 py-4 text-left text-sm font-bold uppercase tracking-wider text-white">
                  Amount
                </th>

                <th className="px-9 py-4 text-left text-sm font-bold uppercase tracking-wider text-white">
                  Status
                </th>

                <th className="px-10 py-4 text-left text-sm font-bold uppercase tracking-wider text-white">
                  Date
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white">
                  Action
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}
            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-14 text-center text-sm text-white/40"
                  >
                    Loading payments...
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-14 text-center text-sm text-white/40"
                  >
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="
                      border-b
                      border-white/5
                      transition-colors
                      duration-200
                      hover:bg-white/[0.025]
                      last:border-b-0
                    "
                  >

                    {/* USER */}
                    <td className="px-6 py-4">

                      <div>
                        <p className="font-semibold text-white/90">
                          {payment.user_name}
                        </p>

                        <p className="mt-0.5 text-xs text-white/45">
                          {payment.user_email}
                        </p>
                      </div>

                    </td>

                    {/* COURSE */}
                    <td className="px-6 py-4">

                      <p className="max-w-xs truncate font-medium text-white/70">
                        {payment.course_title}
                      </p>

                    </td>

                    {/* AMOUNT */}
                    <td className="px-6 py-4">

                      <span className="font-semibold text-white/80">
                        ₹{Number(payment.amount).toLocaleString("en-IN")}
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">

                      <span
                        className={`
                          inline-flex
                          min-w-[78px]
                          items-center
                          justify-center
                          rounded-md
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          ${getStatusClass(payment.status)}
                        `}
                      >
                        {getStatusText(payment.status)}
                      </span>

                    </td>

                    {/* DATE */}
                    <td className="px-6 py-4 text-sm text-white/55">
                      {formatDate(payment.created_at)}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-center">

                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          px-3
                          py-2
                          text-sm
                          font-medium
                          text-blue-400
                          transition
                          hover:bg-blue-500/10
                          hover:text-blue-300
                        "
                      >
                        <FaEye size={13} />
                        View
                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* ================= PAYMENT DETAILS MODAL ================= */}
      {selectedPayment && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-[3px]
          "
          onClick={() => setSelectedPayment(null)}
        >

          <div
            className="
              w-full
              max-w-xl
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#1c1930]
              shadow-2xl
              shadow-black/50
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#211b37] px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-white/90">
                  Payment Details
                </h2>

                <p className="mt-1 text-xs text-white/40">
                  Transaction information
                </p>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-xl
                  text-white/40
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                ×
              </button>

            </div>

            {/* MODAL BODY */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">

              {/* USER */}
              <div className="rounded-xl border border-white/10 bg-[#222133] p-4">

                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/35">
                  User
                </p>

                <p className="font-semibold text-white/90">
                  {selectedPayment.user_name}
                </p>

                <p className="mt-1 text-sm text-white/45">
                  {selectedPayment.user_email}
                </p>

              </div>

              {/* COURSE */}
              <div className="mt-4 rounded-xl border border-white/10 bg-[#222133] p-4">

                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/35">
                  Course
                </p>

                <p className="font-semibold text-white/90">
                  {selectedPayment.course_title}
                </p>

              </div>

              {/* AMOUNT + STATUS */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-white/10 bg-[#222133] p-4">

                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/35">
                    Amount
                  </p>

                  <p className="text-xl font-bold text-green-400">
                    ₹{Number(selectedPayment.amount).toLocaleString("en-IN")}
                  </p>

                </div>

                <div className="rounded-xl border border-white/10 bg-[#222133] p-4">

                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/35">
                    Status
                  </p>

                  <span
                    className={`
                      inline-flex
                      min-w-[78px]
                      items-center
                      justify-center
                      rounded-md
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      ${getStatusClass(selectedPayment.status)}
                    `}
                  >
                    {getStatusText(selectedPayment.status)}
                  </span>

                </div>

              </div>

              {/* ORDER ID */}
              <div className="mt-4 rounded-xl border border-white/10 bg-[#222133] p-4">

                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/35">
                  Razorpay Order ID
                </p>

                <p className="break-all text-sm font-medium text-white/70">
                  {selectedPayment.razorpay_order_id}
                </p>

              </div>

              {/* PAYMENT ID */}
              <div className="mt-4 rounded-xl border border-white/10 bg-[#222133] p-4">

                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/35">
                  Razorpay Payment ID
                </p>

                <p className="break-all text-sm font-medium text-white/70">
                  {selectedPayment.razorpay_payment_id ||
                    "Not available"}
                </p>

              </div>

              {/* DATE */}
              <div className="mt-4 rounded-xl border border-white/10 bg-[#222133] p-4">

                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/35">
                  Payment Date
                </p>

                <p className="text-sm font-medium text-white/70">
                  {formatDate(selectedPayment.created_at)}
                </p>

              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="border-t border-white/10 bg-[#211b37] px-6 py-4">

              <button
                onClick={() => setSelectedPayment(null)}
                className="
                  w-full
                  rounded-lg
                  bg-purple-600
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-purple-500
                  active:scale-[0.99]
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminPayments;
