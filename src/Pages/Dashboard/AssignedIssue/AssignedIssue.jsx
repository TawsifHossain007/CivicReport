import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: issues = [] } = useQuery({
    queryKey: ["assigned-issue", user.email, "In Progress"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/issues/staffs?staffEmail=${user.email}`
      );
      return res.data;
    },
  });

  const handleStatusChange = async (issueId, newStatus) => {
    const result = await axiosSecure.patch(`/issues/${issueId}/status`, {IssueStatus : newStatus});

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

  return (
    <div className="min-h-screen p-8">
      <h1 className="font-bold text-3xl">Assigned Issues</h1>

      <div className="overflow-x-auto mt-15">
        <table className="table table-zebra">
          {/* head */}
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
            {issues.map((issue, index) => (
              <tr key={issue._id}>
                <th>{index + 1}</th>
                <td className="font-medium">{issue.title}</td>
                <td>{issue.category}</td>
                <td className="font-medium ">
                  <span
                    className={`badge badge-outline
      ${issue.IssueStatus === "Pending" && "badge-warning"}
      ${issue.IssueStatus === "In Progress" && "badge-info"}
      ${issue.IssueStatus === "Working" && "badge-primary"}
      ${issue.IssueStatus === "Resolved" && "badge-success"}
      ${issue.IssueStatus === "Closed" && "badge-neutral"}
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
                  <>
                    <div className="dropdown dropdown-right dropdown-center">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-primary text-black m-1"
                      >
                        Change Status
                      </div>
                      <ul
                        tabIndex="-1"
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <button onClick={()=>handleStatusChange(issue._id, "In Progress")}>In Progress</button>
                        </li>
                        <li>
                          <button onClick={()=>handleStatusChange(issue._id, "Working")}>Working</button>
                        </li>
                        <li>
                          <button onClick={()=>handleStatusChange(issue._id, "Resolved")}>Resolved</button>
                        </li>
                        <li>
                          <button onClick={()=>handleStatusChange(issue._id, "Closed")}>Closed</button>
                        </li>
                      </ul>
                    </div>
                  </>
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
