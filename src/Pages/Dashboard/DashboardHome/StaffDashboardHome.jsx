import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";

const StaffDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: issues = [] } = useQuery({
    queryKey: ["assigned-issues", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/staffs?staffEmail=${user.email}`);
      return res.data;
    },
  });

  const resolvedIssues = issues.filter((issue) => issue.IssueStatus === "Resolved");
  const todayString = new Date().toDateString();
  const todayIssues = issues.filter(
    (issue) => issue.assignDate && new Date(issue.assignDate).toDateString() === todayString
  );

  const pieData = [
    { name: "Resolved", value: resolvedIssues.length },
    { name: "Unresolved", value: issues.length - resolvedIssues.length },
  ];
  const COLORS = ["#4ade80", "#f87171"]; 

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toDateString();
  }).reverse();

  const barData = last7Days.map((day) => ({
    day: day.split(" ").slice(0, 3).join(" "), 
    count: issues.filter((issue) => issue.assignDate && new Date(issue.assignDate).toDateString() === day).length,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Assigned Issues</h2>
          <p className="text-3xl font-bold mt-2">{issues.length}</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Resolved Issues</h2>
          <p className="text-3xl font-bold mt-2">{resolvedIssues.length}</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <h2 className="text-lg font-medium text-gray-600">Today's Issues</h2>
          <p className="text-3xl font-bold mt-2">{todayIssues.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-medium mb-4 text-center">Resolved vs Unresolved</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-medium mb-4 text-center">Issues Assigned (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardHome;
