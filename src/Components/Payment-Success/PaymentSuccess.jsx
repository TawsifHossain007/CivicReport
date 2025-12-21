import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { FaCrown, FaCheckCircle, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
    }
  }, [sessionId,axiosSecure]);

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("Payment Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text("Premium Profile Subscription", 20, 35);

    doc.line(20, 40, 190, 40);

    // User info (PROOF)
    doc.text(`Customer Name: ${user?.displayName || "N/A"}`, 20, 55);
    doc.text(`Customer Email: ${user?.email || "N/A"}`, 20, 65);

    // Payment info
    doc.text(`Subscription Type: Profile Premium`, 20, 80);
    doc.text(`Amount Paid: ৳1000`, 20, 90);
    doc.text(`Payment Status: Paid`, 20, 100);
    doc.text(`Account Status: Premium`, 20, 110);

    doc.text(`Session ID: ${sessionId}`, 20, 125);
    doc.text(
      `Payment Date: ${new Date().toLocaleDateString()}`,
      20,
      135
    );

    doc.line(20, 150, 190, 150);
    doc.text("This invoice is valid as payment proof.", 20, 165);
    doc.text("Thank you for choosing our platform.", 20, 175);

    doc.save("Premium_Profile_Invoice.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Icon */}
        <div className="relative inline-block">
          <FaCrown size={72} className="text-green-500 mx-auto" />
          <FaCheckCircle
            size={26}
            className="absolute -bottom-1 -right-1 text-emerald-500 bg-white rounded-full"
          />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Premium Activated 🎉
        </h1>

        <p className="mt-2 text-gray-600">
          Your profile has been upgraded to{" "}
          <span className="font-semibold text-green-600">Premium</span>.
        </p>

        {/* USER PROOF CARD */}
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
        <div className="mt-4 rounded-xl bg-amber-50 border border-green-200 p-4 text-left">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Subscription</span>
            <span className="font-semibold">Profile Premium</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Amount Paid</span>
            <span className="font-semibold">৳1000</span>
          </div>

          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Status</span>
            <span className="font-semibold text-emerald-600">Active</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/dashboard/my-profile"
            className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            Go to My Profile
          </Link>

          <button
            onClick={handleDownloadInvoice}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition"
          >
            <FaDownload />
            Download Invoice (PDF)
          </button>

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

export default PaymentSuccess;
