import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: issues = [] } = useQuery({
    queryKey: ["assigned-issue", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/staffs?staffEmail=${user.email}`);
      return res.data;
    },
  });

  const [filter, setFilter] = useState("");

  const statusOrder = ["Pending", "In-Progress", "Working", "Resolved", "Closed"];
  const priorityOrder = ["High", "Normal"];

  const handleStatusChange = async (issueId, newStatus) => {
    const result = await axiosSecure.patch(`/issues/${issueId}/status`, {
      IssueStatus: newStatus,
    });

    if (result.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Status Changed to ${newStatus}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const filteredIssues = [...issues].sort((a, b) => {
    if (filter === "Status") {
      const statusDiff = statusOrder.indexOf(a.IssueStatus) - statusOrder.indexOf(b.IssueStatus);
      if (statusDiff !== 0) return statusDiff;
    } else if (filter === "Priority") {
      const priorityDiff = priorityOrder.indexOf(a.Priority) - priorityOrder.indexOf(b.Priority);
      if (priorityDiff !== 0) return priorityDiff;
    }
    if (a.Priority === "High" && b.Priority !== "High") return -1;
    if (a.Priority !== "High" && b.Priority === "High") return 1;
    return 0;
  });

  return (
    <div className="min-h-screen p-8">
      <h1 className="font-bold text-3xl">Assigned Issues</h1>

      <div className="dropdown dropdown-center mt-10">
        <div tabIndex={0} role="button" className="btn m-1">Filter by Status/Priority :</div>
        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a onClick={() => setFilter("Status")}>Status</a></li>
          <li><a onClick={() => setFilter("Priority")}>Priority</a></li>
          <li><a onClick={() => setFilter("")}>None</a></li>
        </ul>
      </div>

      <div className="overflow-x-auto mt-15">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue, index) => (
              <tr key={issue._id}>
                <th>{index + 1}</th>
                <td className="font-medium">{issue.title}</td>
                <td>{issue.category}</td>
                <td className="font-medium">
                  <span
                    className={`badge badge-outline
                      ${issue.IssueStatus === "Pending" && "badge-warning"}
                      ${issue.IssueStatus === "In Progress" && "badge-info"}
                      ${issue.IssueStatus === "Working" && "badge-primary"}
                      ${issue.IssueStatus === "Resolved" && "badge-success"}
                      ${issue.IssueStatus === "Closed" && "badge-neutral"}
                      ${issue.IssueStatus === "Rejected" && "badge-error"}
                    `}
                  >
                    {issue.IssueStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge badge-outline
                      ${issue.Priority === "High" ? "badge-error" : "badge-secondary"}
                    `}
                  >
                    {issue.Priority}
                  </span>
                </td>
                <td>
                  <div className="dropdown dropdown-right dropdown-center">
                    <div tabIndex={0} role="button" className="btn btn-primary text-black m-1">
                      Change Status
                    </div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li><button onClick={() => handleStatusChange(issue._id, "In Progress")}>In Progress</button></li>
                      <li><button onClick={() => handleStatusChange(issue._id, "Working")}>Working</button></li>
                      <li><button onClick={() => handleStatusChange(issue._id, "Resolved")}>Resolved</button></li>
                      <li><button onClick={() => handleStatusChange(issue._id, "Closed")}>Closed</button></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedIssue;
