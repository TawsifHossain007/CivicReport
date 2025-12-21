import React, { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import { useSearchParams, Link } from "react-router";
import { FaCheckCircle, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

const BoostPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/boost-payment-success?session_id=${sessionId}`);
    }
    // axiosSecure intentionally omitted to avoid re-trigger
  }, [sessionId,axiosSecure]);

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Payment Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text("Boost Payment - High Priority Issue", 20, 35);

    doc.line(20, 40, 190, 40);

    // User info
    doc.text(`Customer Name: ${user?.displayName || "N/A"}`, 20, 55);
    doc.text(`Customer Email: ${user?.email || "N/A"}`, 20, 65);

    // Payment info
    doc.text(`Boost Amount: ৳100`, 20, 80);
    doc.text(`Payment Status: Paid`, 20, 90);
    doc.text(`Issue Priority: High`, 20, 100);

    doc.text(`Session ID: ${sessionId}`, 20, 115);
    doc.text(
      `Payment Date: ${new Date().toLocaleDateString()}`,
      20,
      125
    );

    doc.line(20, 140, 190, 140);
    doc.text("This invoice is proof of your boost payment.", 20, 155);
    doc.text("Thank you for supporting our platform.", 20, 165);

    doc.save("Boost_Payment_Invoice.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-sky-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <FaCheckCircle size={72} className="mx-auto text-emerald-500" />

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Boost Activated Successfully
        </h1>

        <p className="mt-2 text-gray-600">
          Your issue has been marked as{" "}
          <span className="font-semibold text-red-500">High Priority</span>.
        </p>

        {/* USER INFO */}
        <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4 text-left">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Name:</span>{" "}
            {user?.displayName || "N/A"}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-semibold">Email:</span>{" "}
            {user?.email || "N/A"}
          </p>
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-left">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Boost Amount</span>
            <span className="font-semibold">৳100</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Status</span>
            <span className="font-semibold text-emerald-600">Paid</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Priority</span>
            <span className="font-semibold text-red-500">High</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleDownloadInvoice}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition"
          >
            <FaDownload />
            Download Invoice (PDF)
          </button>

          <Link
            to="/dashboard/my-issues"
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            View My Issue
          </Link>

          <Link
            to="/"
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default BoostPaymentSuccess;
