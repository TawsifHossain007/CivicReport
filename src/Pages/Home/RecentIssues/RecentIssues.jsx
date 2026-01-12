import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import IssueCard from "../../AllIssues/IssueCard";

const RecentIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["recent-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  const issues = Array.isArray(data?.issues) ? data.issues : [];

  const recentIssues = [...issues]
    .filter((issue) => issue.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold text-green-900 text-center mb-6">Recent Issues</h1>
      <p className="text-green-800 text-center mb-12 max-w-2xl mx-auto"> Stay updated with the latest reported issues in your area. Here you can see the most recent concerns raised by our community and track their resolution status.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-11/12 mx-auto mt-20">
        {recentIssues.map((issue) => (
          <IssueCard key={issue._id} issue={issue}></IssueCard>
        ))}
      </div>
    </div>
  );
};

export default RecentIssues;
