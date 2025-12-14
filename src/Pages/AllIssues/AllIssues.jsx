import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure";
import IssueCard from "./IssueCard";

const AllIssues = () => {

    const axiosSecure = useAxiosSecure()
    const {data: issues = []} = useQuery({
        queryKey: ['all-issues'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/issues')
            return res.data
        }
    })

  return (
    <div className="min-h-screen max-w-11/12 mx-auto mb-20">
      <div className="text-center mt-10">
        <h1 className="font-bold text-5xl text-shadow-green-800">All Issues</h1>
        <p className="font-normal text-gray-500 pt-3">
          View, track, and manage all reported issues in one place. <br /> Stay updated
          on what’s happening and take action when needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        {
            issues.map((issue)=> <IssueCard key={issue._id} issue={issue}></IssueCard>)
        }
      </div>
    </div>
  );
};

export default AllIssues;
