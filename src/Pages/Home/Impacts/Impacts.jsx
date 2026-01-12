import React from "react";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaClipboardList, FaCheckCircle, FaUsers } from "react-icons/fa";

const Impacts = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch issues
  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data.issues;
    },
  });

  // Fetch users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const totalIssues = issues.length;
  const resolvedIssues = issues.filter((i) => i.IssueStatus === "Resolved").length;
  const totalUsers = users.length;

  return (
    <section className="max-w-11/12 mx-auto text-center">
      {/* Heading */}
      <h2 className="text-3xl lg:text-4xl font-bold text-green-900 text-center mb-6">
        Our Platform Impact
      </h2>
      <p className="text-green-800 text-center mb-12 max-w-2xl mx-auto">
        See how CivicReport is making a difference. From resolved issues to our growing community, your contributions matter.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Issues */}
        <div className="flex bg-white flex-col items-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
          <FaClipboardList className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">{totalIssues}</h3>
          <p className="text-gray-600 mt-2">Issues Submitted</p>
        </div>

        {/* Resolved Issues */}
        <div className="flex bg-white flex-col items-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
          <FaCheckCircle className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">{resolvedIssues}</h3>
          <p className="text-gray-600 mt-2">Issues Resolved</p>
        </div>

        {/* Total Users */}
        <div className="flex bg-white flex-col items-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
          <FaUsers className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-3xl font-bold text-gray-900">{totalUsers}</h3>
          <p className="text-gray-600 mt-2">Registered Users</p>
        </div>
      </div>
    </section>
  );
};

export default Impacts;
