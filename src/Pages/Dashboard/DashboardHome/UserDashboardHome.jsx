import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: issues = [] } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?email=${user.email}`);
      return res.data.issues;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  const pending = issues.filter((i) => i.IssueStatus === "Pending").length;
  const inProgress = issues.filter(
    (i) => i.IssueStatus === "In Progress"
  ).length;
  const resolved = issues.filter((i) => i.IssueStatus === "Resolved").length;

  const pieData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
  ];

  const barData = [
    { status: "Pending", count: pending },
    { status: "In Progress", count: inProgress },
    { status: "Resolved", count: resolved },
  ];

  const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

  const totalAmountReceived = payments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-1">My Dashboard</h1>
      <p className="text-gray-500 mb-8">Overview of your reported issues</p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        {[
          { label: "Total Issues", value: issues.length },
          { label: "Pending", value: pending, color: "text-yellow-500" },
          { label: "In Progress", value: inProgress, color: "text-blue-500" },
          { label: "Resolved", value: resolved, color: "text-green-500" },
           {
            label: "Payments Made",
            value: `৳ ${totalAmountReceived}`,
            sub: `${payments.length} payments`,
            color: "text-indigo-600",
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm p-6">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Issue Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
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

        {/* Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Issues by Status</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
