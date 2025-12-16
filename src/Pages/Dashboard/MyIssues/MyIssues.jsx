import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
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

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedIssues, setSelectedIssues] = useState(null);

  const handelDeleteIssue = (id) => {

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
                text: "Your Issue Report has been deleted.",
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

  const handleUpdate = async (data) => {
    const imageFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const ImageApiURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_Host_Key
    }`;

    const imgRes = await axios.post(ImageApiURL, formData);
    const imageUrl = imgRes.data.data.url;

    // Prepare issue data
    const issueData = {
      reporterName: data.reporterName,
      reporterEmail: data.reporterEmail,
      title: data.title,
      description: data.description,
      category: data.category,
      image: imageUrl,
      IssueStatus: "Pending",
      location: data.location,
      date: new Date().toISOString(),
    };

    axiosSecure
      .patch(`/issues/${selectedIssues._id}`, issueData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "Center",
            icon: "success",
            title: "Your Report Has Been Updated",
            showConfirmButton: false,
            timer: 1500,
          });
          issueModalRef.current.close();
          refetch();
        }
      });
  };

  const issueModalRef = useRef();

  const openIssueEditModal = (issue) => {
    setSelectedIssues(issue);
    reset(issue);
    issueModalRef.current.showModal();
  };

  return (
    <div className=" p-8">
      <h1 className="font-bold text-3xl">My Issues</h1>

      <div className="overflow-x-auto mt-15">
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
                    <button
                      onClick={() => openIssueEditModal(issue)}
                      className="btn btn-primary text-black mx-2"
                    >
                      Edit
                    </button>
                  )}
                  <Link to={`/issue-details/${issue._id}`}>
                      <button className="btn mx-2 btn-primary text-black">
                    View Details
                  </button>
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        ref={issueModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div>
            <div className=" card bg-white  w-full mx-auto max-w-lg shadow-2xl p-6">
              <h3 className="text-center font-semibold text-3xl text-secondary">
                Update Issue
              </h3>
              <p className="text-center pt-3">
                Help us keep the community better
              </p>

              <form className="card-body" onSubmit={handleSubmit(handleUpdate)}>
                <fieldset className="fieldset">
                  {/* TITLE */}
                  <label className="label">Title</label>
                  <input
                    defaultValue={selectedIssues?.title}
                    type="text"
                    className="input bg-white"
                    placeholder="Issue Title"
                    {...register("title", { required: true })}
                  />
                  {errors.title?.type === "required" && (
                    <p className="text-red-200 text-sm font-medium mt-1">
                      Title is required
                    </p>
                  )}

                  {/* DESCRIPTION */}
                  <label className="label">Description</label>
                  <textarea
                    defaultValue={selectedIssues?.description}
                    className="textarea bg-white"
                    placeholder="Describe the issue..."
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors.description?.type === "required" && (
                    <p className="text-red-200 text-sm font-medium mt-1">
                      Description is required
                    </p>
                  )}

                  {/* CATEGORY */}
                  <label className="label">Category</label>
                  <select
                    defaultValue={selectedIssues?.category}
                    className="select bg-white"
                    {...register("category", { required: true })}
                  >
                    <option value="">Select a category</option>
                    <option value="Road Damage">Road Damage</option>
                    <option value="Water Leakage">Water Leakage</option>
                    <option value="Garbage Overflow">Garbage Overflow</option>
                    <option value="Streetlight Issue">Streetlight Issue</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category?.type === "required" && (
                    <p className="text-red-200 text-sm font-medium mt-1">
                      Category is required
                    </p>
                  )}

                  {/* PHOTO */}
                  <label className="label">Upload Image</label>
                  <input
                    type="file"
                    className="file-input bg-white"
                    {...register("photo", { required: true })}
                  />
                  {errors.photo?.type === "required" && (
                    <p className="text-red-200 text-sm font-medium mt-1">
                      Image is required
                    </p>
                  )}

                  {/* LOCATION */}
                  <label className="label">Location</label>
                  <input
                    defaultValue={selectedIssues?.location}
                    type="text"
                    className="input bg-white"
                    placeholder="Enter location"
                    {...register("location", { required: true })}
                  />
                  {errors.location?.type === "required" && (
                    <p className="text-red-200 text-sm font-medium mt-1">
                      Location is required
                    </p>
                  )}

                  <button type="submit" className="btn btn-neutral mt-4">
                    Update Issue
                  </button>
                </fieldset>
              </form>
            </div>
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

export default MyIssues;