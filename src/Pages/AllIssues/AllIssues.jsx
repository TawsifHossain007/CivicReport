import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure";
import IssueCard from "./IssueCard";
import Loading from "../../Components/Loading/Loading";

const AllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");

  const { data: issues, isLoading } = useQuery({
    queryKey: ["all-issues", searchText, filter],
    initialData: [],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues?searchText=${searchText}&filter=${filter}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(issues);

  return (
    <div className="min-h-screen max-w-11/12 mx-auto mb-20">
      {/* Heading animation */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-bold text-5xl text-shadow-green-800">All Issues</h1>
        <p className="font-normal text-gray-500 pt-3">
          View, track, and manage all reported issues in one place. <br /> Stay
          updated on what’s happening and take action when needed.
        </p>
      </motion.div>

      <div className="flex items-center justify-between">
        <label className="input mb-10 mt-10">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search Issues"
          />
        </label>

        <div className="dropdown dropdown-center">
          <div tabIndex={0} role="button" className="btn m-1">
            Filter by :
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a onClick={() => setFilter("Priority")}>Priority</a>
            </li>
            <li>
              <a onClick={() => setFilter("Category")}>Category</a>
            </li>
            <li>
              <a onClick={() => setFilter("Status")}>Status</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Cards stagger animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {issues.map((issue) => (
          <div
            key={issue._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <IssueCard issue={issue}></IssueCard>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllIssues;
