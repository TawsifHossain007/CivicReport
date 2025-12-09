import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: issues = [] } = useQuery({
    queryKey: ["myIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues?email=${user.email}`);
      return res.data;
    },
  });

  const handelDeleteIssue = (id) => {
    console.log("delete id:", id);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/issues/${id}`).then((res) => {
            if (res.data.deletedCount) {
              refetch();

              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your parcel request has been deleted.",
                icon: "success",
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Report has not been deleted",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className=" my-20">
      <h1>My Issues</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Category</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr key={issue._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{issue.title}</td>
                <td>{issue.IssueStatus}</td>
                <td className="font-semibold">{issue.category}</td>
                <td>{issue.location}</td>
                <td>
                  <button
                    onClick={() => handelDeleteIssue(issue._id)}
                    className="btn btn-primary text-black mx-2"
                  >
                    Delete
                  </button>
                  {issue.IssueStatus === "Pending" && (
                    <Link to={"/dashboard/edit-issue"}>
                      <button className="btn btn-primary text-black mx-2">
                        Edit
                      </button>
                    </Link>
                  )}

                  <button className="btn mx-2 btn-primary text-black">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
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

export default MyIssues;
