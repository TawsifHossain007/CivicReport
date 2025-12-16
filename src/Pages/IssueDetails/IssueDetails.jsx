import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import {
  FaArrowUp,
  FaBolt,
  FaClock,
  FaEdit,
  FaMapMarkerAlt,
  FaTrash,
  FaUser,
} from "react-icons/fa";

const IssueDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const issueModalRef = useRef();
  const [selectedIssues, setSelectedIssues] = useState(null);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    refetch,
    data: issue = {},
    isLoading,
  } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const {
    title,
    description,
    image,
    category,
    IssueStatus,
    Priority,
    VoteCount,
    location,
    reporterName,
    reporterEmail,
    date,
    staffName,
  } = issue;

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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Report has not been deleted",
            icon: "error",
          });
        }
      });
  };

  const openIssueEditModal = (issue) => {
    setSelectedIssues(issue);
    reset(issue);
    issueModalRef.current.showModal();
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

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Main Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Image */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt={title}
              className="w-full h-100 object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-2 bg-linear-to-br from-white via-green-100 to-green-200 rounded-3xl shadow-lg p-8 space-y-6">
          {/* Title */}
          <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-outline text-sm">{category}</span>

            {IssueStatus === "Pending" ? (
              <span className="badge badge-warning badge-outline">Pending</span>
            ) : IssueStatus === "In Progress" ? (
              <span className="badge badge-info badge-outline">
                In Progress
              </span>
            ) : IssueStatus === "Working" ? (
              <span className="badge badge-primary badge-outline">Working</span>
            ) : IssueStatus === "Resolved" ? (
              <span className="badge badge-success badge-outline">
                Resolved
              </span>
            ) : IssueStatus === "Closed" ? (
              <span className="badge badge-neutral badge-outline">Closed</span>
            ) : null}

            {Priority === "High" ? (
              <span className="badge badge-error badge-outline">
                High Priority
              </span>
            ) : (
              <span className="badge badge-outline">Normal Priority</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{description}</p>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-700" />
              <span>{location}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-green-700" />
              <span>{new Date(date).toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaUser className="text-green-700" />
              <span>{reporterName}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaArrowUp className="text-green-700" />
              <span>{VoteCount} Votes</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-green-200/70" />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {reporterEmail === user?.email && (
              <>
                {IssueStatus === "Pending" && (
                  <>
                    <button
                      onClick={() => openIssueEditModal(issue)}
                      className="btn btn-outline btn-success gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                  </>
                )}

                <button
                  onClick={() => handelDeleteIssue(id)}
                  className="btn btn-outline btn-error gap-2"
                >
                  <FaTrash /> Delete
                </button>

                {Priority !== "High" && (
                  <button className="btn btn-outline btn-warning gap-2">
                    <FaBolt /> Boost Priority (৳100)
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Timeline (UI only) */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Issue Timeline
        </h3>

        <ul className="space-y-4 border-l-2 border-green-300 pl-6">
          <li>
            <p className="text-sm text-gray-500">Reported</p>
            <p className="text-gray-700">
              Issue was reported by <b>{reporterName}</b>
            </p>
          </li>

          {IssueStatus !== "Pending" && (
            <li>
              <p className="text-sm text-gray-500">Assigned</p>
              <p className="text-gray-700">
                Issue was assigned to <b>{staffName}</b>
              </p>
            </li>
          )}

          {IssueStatus === "Working" && (
            <li>
              <p className="text-sm text-gray-500">Update</p>
              <p className="text-gray-700">
                Work Marked as <b>Working</b>
              </p>
            </li>
          )}

          {IssueStatus === "Resolved" && (
            <>
              <li>
                <p className="text-sm text-gray-500">Update</p>
                <p className="text-gray-700">
                  Work Marked as <b>Working</b>
                </p>
              </li>

              <li>
                <p className="text-sm text-gray-500">Update</p>
                <p className="text-gray-700">
                  Work Marked as <b>Resolved</b>
                </p>
              </li>
            </>
          )}

          {IssueStatus === "Closed" && (
            <>
              <li>
                <p className="text-sm text-gray-500">Update</p>
                <p className="text-gray-700">
                  Work Marked as <b>Working</b>
                </p>
              </li>

              <li>
                <p className="text-sm text-gray-500">Update</p>
                <p className="text-gray-700">
                  Work Marked as <b>Resolved</b>
                </p>
              </li>

              <li>
                <p className="text-sm text-gray-500">Update</p>
                <p className="text-gray-700">
                  Work Marked as <b>Closed</b>
                </p>
              </li>
            </>
          )}

          <li>
            <p className="text-sm text-gray-500">Priority</p>
            <p className="text-gray-700">
              Priority level: <b>{Priority}</b>
            </p>
          </li>
        </ul>
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

export default IssueDetails;
