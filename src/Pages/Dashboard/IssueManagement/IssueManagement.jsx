import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdAssignment } from "react-icons/md";
import Swal from "sweetalert2";

const IssueManagement = () => {
  const axiosSecure = useAxiosSecure();
  const {refetch, data: issues = [] } = useQuery({
    queryKey: ["issue-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  const { data: staffs = [] } = useQuery({
    queryKey: ["staffs-assign"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs");
      return res.data;
    },
  });

  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleAssignStaff = (staff) => {
    const staffAssignInfo = {
      staffId: staff._id,
      staffName: staff.displayName,
      staffEmail: staff.email,
      issueId: selectedIssue._id,
      trackingId: selectedIssue.trackingId,
    };

    axiosSecure
      .patch(`/issues/${selectedIssue._id}/assign`, staffAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
            refetch()
          staffModalRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Staff has been assigned`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const staffModalRef = useRef();

  const openStaffModal = (issue) => {
    setSelectedIssue(issue);
    staffModalRef.current.showModal();
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="font-bold text-3xl">All Issues</h1>

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
                <td>{issue.title}</td>
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
                  {
                    issue.staffName ? <><span className="text-green-500 font-medium text-center">Assigned</span></> : <><button
                    onClick={()=>openStaffModal(issue)}
                    className="btn btn-primary text-black"
                  >
                    Assign Staff
                  </button></>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        ref={staffModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="overflow-x-auto mt-15">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => (
                  <tr key={staff._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={staff.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{staff.displayName}</div>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border
            ${
              staff.status === "In Service"
                ? "bg-red-50 text-red-600 border-red-200"
                : staff.status === "Available"
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "bg-gray-50 text-gray-600 border-gray-200"
            }
          `}
                          >
                            {staff.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{staff.email}</td>
                    <th>
                      <div className="tooltip" data-tip="Assign Staff">
                        <button onClick={()=>handleAssignStaff(staff)} className="btn btn-error text-black">
                          Assign
                        </button>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default IssueManagement;
