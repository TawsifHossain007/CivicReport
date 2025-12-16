import React from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: crntuser = [] } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const handleSubscribe = async () => {
    Swal.fire({
      title: "Subscribe & Become Premium",
      text: "You will be charged 1000 BDT",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay 1000৳",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Payment er work here");
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 min-h-screen">
      <div className="rounded-2xl shadow-xl p-8 bg-linear-to-br from-white via-green-50 to-green-100 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <img
            src={crntuser?.photoURL}
            alt="profile"
            className="w-28 h-28 rounded-full shadow-md border-2 border-green-300"
          />

          <h2 className="text-3xl font-semibold flex items-center gap-2">
            {crntuser?.displayName}

            {crntuser?.status === "Premium" && (
              <span className="badge badge-warning text-black font-semibold">
                ⭐ Premium
              </span>
            )}
          </h2>
          <p className="text-gray-700 text-lg">{crntuser?.email}</p>

          <div className="mt-1 flex flex-col items-center">
            <span
              className={
                crntuser?.status === "Premium"
                  ? "badge badge-success text-white"
                  : crntuser?.status === "Pending"
                  ? "badge badge-warning"
                  : crntuser?.status === "Blocked"
                  ? "badge badge-error text-white"
                  : "badge badge-outline"
              }
            >
              {crntuser?.status || "Regular"}
            </span>
            {crntuser.status === "Blocked" && (
              <p className="text-center mt-5">
                <span className="text-red-700 font-semibold">Warning! -- </span>
                {"  "}
                <span className="bg-red-700 text-white p-2 rounded-2xl">
                  Please Contact With the Authorities.
                </span>
              </p>
            )}
          </div>

          <div className="w-full border-t my-6 border-green-200"></div>

          <div className="w-full space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {crntuser?.displayName}
            </p>
            <p>
              <strong>Email:</strong> {crntuser?.email}
            </p>
            <p>
              <strong>Role: {crntuser.role}</strong>{" "}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(crntuser?.createdAt).toDateString()}
            </p>
          </div>

          <div className="w-full border-t my-6 border-green-200"></div>

          {/* Buttons */}
          <div className="flex gap-4">
            {/* Update Profile Button */}
            <button className="btn bg-green-600 text-white hover:bg-green-700">
              Update Profile
            </button>

            {/* Subscribe Button */}
            {crntuser?.status !== "Premium" && (
              <button
                onClick={handleSubscribe}
                className="btn bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Subscribe 1000৳
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
