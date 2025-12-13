import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import { FaUserPlus, FaUserSlash } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["user-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/${user._id}/role`, { role: "admin" })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.displayName} marked as an admin.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const handleRemoveAdmin = (user) => {
    axiosSecure
      .patch(`/users/${user._id}/role`, { role: "user" })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.displayName} removed from admin.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const handleBlockUser = (user) => {
    swalWithBootstrapButtons
      .fire({
        title: `Block ${user.displayName}?`,
        text: "User will not be able to access the website.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, block user!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/${user._id}/status`, { status: "Blocked" })
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${user.displayName} has been blocked.`,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });
        }
      });
  };

  const handleUnblockUser = (user) => {
    swalWithBootstrapButtons
      .fire({
        title: `Unblock ${user.displayName}?`,
        text: "User will regain access to the website.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, unblock user!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/users/${user._id}/status`, { status: "Regular" })
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${user.displayName} has been unblocked.`,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });
        }
      });
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="font-bold text-4xl mb-6">User Management</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border
      ${
        user.status === "Blocked"
          ? "bg-red-50 text-red-600 border-red-200"
          : "bg-emerald-50 text-emerald-600 border-emerald-200"
      }
    `}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="font-semibold">{user.email}</td>

                <td className="font-bold capitalize">{user.role}</td>
                <td className="flex gap-2">
                  {user.role !== "admin" ? (
                    <div className="tooltip" data-tip="Make Admin">
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm btn-success"
                      >
                        <FaUserPlus />
                      </button>
                    </div>
                  ) : (
                    <div className="tooltip" data-tip="Remove Admin">
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-sm btn-warning"
                      >
                        <FaUserSlash />
                      </button>
                    </div>
                  )}

                  {user.status === "Blocked" ? (
                    <div className="tooltip" data-tip="Unblock User">
                      <button
                        onClick={() => handleUnblockUser(user)}
                        className="btn btn-sm btn-info"
                      >
                        <CgUnblock />
                      </button>
                    </div>
                  ) : (
                    <div className="tooltip" data-tip="Block User">
                      <button
                        onClick={() => handleBlockUser(user)}
                        className="btn btn-sm btn-error"
                      >
                        <MdOutlineBlock />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
