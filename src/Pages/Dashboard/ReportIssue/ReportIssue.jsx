import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import ReportImg from "../../../assets/Report-removebg-preview.png";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";
import axios from "axios";

const ReportIssue = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleReport = async (data) => {
    const imageFile = data.photo[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const ImageApiURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_Host_Key
    }`;

    const imgRes = await axios.post(ImageApiURL, formData);
    const imageUrl = imgRes.data.data.url;

    const issueData = {
      reporterName : data.reporterName,
      reporterEmail: data.reporterEmail, 
      title: data.title,
      description: data.description,
      category: data.category,
      image: imageUrl,
      Priority: 'Normal',
      VoteCount: 0,
      IssueStatus: 'Pending',
      location: data.location,
      date: new Date().toISOString(),
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Confirm Report?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, report issue!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          //save issue in db
          axiosSecure.post("/issues", issueData).then((res) => {
            if (res.data.insertedId) {
              navigate("/dashboard/my-issues");
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your issue has been reported.",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Issue report was cancelled",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="flex flex-row-reverse items-center justify-center my-20 mx-15">
      <div className=" card bg-white  w-full mx-auto max-w-lg shadow-2xl p-6">
        <h3 className="text-center font-semibold text-3xl text-secondary">
          Report an Issue
        </h3>
        <p className="text-center pt-3">Help us keep the community better</p>

        <form className="card-body" onSubmit={handleSubmit(handleReport)}>
          <fieldset className="fieldset">
            {/* reporter name */}
            <label className="label">Reporter Name</label>
            <input
              type="text"
              {...register("reporterName")}
              readOnly
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />

            {/* reporter email */}
            <label className="label">Reporter Email</label>
            <input
              type="text"
              {...register("reporterEmail")}
              defaultValue={user?.email}
              readOnly
              className="input w-full"
              placeholder="Sender Email"
            />
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
              Report Issue
            </button>
          </fieldset>
        </form>
      </div>

      <div>
        <img
          className="rounded-full border-4-b border-gray-600"
          src={ReportImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default ReportIssue;
