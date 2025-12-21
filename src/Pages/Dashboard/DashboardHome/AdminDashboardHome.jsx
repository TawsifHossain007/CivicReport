import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data.issues;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const pending = issues.filter((i) => i.IssueStatus === "Pending").length;
  const resolved = issues.filter((i) => i.IssueStatus === "Resolved").length;
  const rejected = issues.filter((i) => i.IssueStatus === "Rejected").length;

  const latestUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const latestIssues = [...issues]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const pieData = [
    { name: "Pending", value: pending },
    { name: "Resolved", value: resolved },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = ["#f59e0b", "#22c55e", "#ef4444"];

  const totalAmountReceived = payments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">System overview & recent activity</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-10">
        {[
          { label: "Total Issues", value: issues.length },
          { label: "Pending", value: pending, color: "text-yellow-500" },
          { label: "Resolved", value: resolved, color: "text-green-500" },
          { label: "Rejected", value: rejected, color: "text-red-500" },
          { label: "Total Users", value: users.length },
          {
            label: "Revenue",
            value: `৳ ${totalAmountReceived}`,
            sub: `${payments.length} payments`,
            color: "text-indigo-600",
          },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500">{item.label}</p>

            <h2 className={`text-3xl font-semibold mt-2 ${item.color || ""}`}>
              {item.value}
            </h2>

            {item.sub && (
              <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Issue Status Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">
            Issue Status Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest Users */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Users</h3>
          <ul className="space-y-3">
            {latestUsers.map((user) => (
              <li key={user._id} className="flex justify-between text-sm">
                <span className="font-medium">{user.name || user.email}</span>
                <span className="text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Issues */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Issues</h3>
          <ul className="space-y-3">
            {latestIssues.map((issue) => (
              <li key={issue._id} className="flex justify-between text-sm">
                <span className="truncate max-w-[160px]">
                  {issue.title || "Untitled Issue"}
                </span>
                <span
                  className={`badge badge-outline ${
                    issue.IssueStatus === "Resolved"
                      ? "badge-success"
                      : issue.IssueStatus === "Pending"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {issue.IssueStatus}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
