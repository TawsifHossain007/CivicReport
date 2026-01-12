import React, { useRef } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole/useRole";
import axios from "axios";
import { useForm } from "react-hook-form";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const { data: crntuser = [],refetch } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/role`);
      return res.data;
    },
  });

  const handleSubscribe = async () => {
    Swal.fire({
      title: "Subscribe & Become Premium",
      text: "You will be charged 1000 BDT",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Pay 1000৳",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const paymentInfo = {
          reporterName: user.displayName,
          reporterEmail: user.email,
          amount: 1000,
          subscriptionType: "Profile Subscription",
        };

        const res = await axiosSecure.post(
          `/create-checkout-session`,
          paymentInfo
        );
        window.location.href = res.data.url;
      }
    });
  };

  const updateUserModalRef = useRef();

    const openUpdateUserModal = (user) => {

    reset({
      name: user.displayName,
      photo: "",
    });
    updateUserModalRef.current.showModal();
  };

  const handleUpdateUser = async (data) => {
  const imageFile = data.photo[0];
  const formData = new FormData();
  formData.append("image", imageFile);

  const ImageApiURL = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_Image_Host_Key
  }`;

  const imgRes = await axios.post(ImageApiURL, formData);
  const imageUrl = imgRes.data.data.url;

  // prepare data
  const userData = {
    contact: data.contact,
    photoURL: imageUrl,
    displayName: data.name,
  };

  await updateUserProfile({ displayName: data.name, imageUrl });

  // choose endpoint based on role
  const endpoint =
    crntuser.role === "staff"
      ? `/staffs/${crntuser._id}` 
      : `/users/${crntuser._id}`; 

  axiosSecure.patch(endpoint, userData).then((res) => {
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "Center",
        icon: "success",
        title: "Information Has Been Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      updateUserModalRef.current.close();
      refetch();
    }
  });
};


    const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

  return (
    <div className="max-w-3xl mx-auto mt-10 min-h-screen">
      <div className="rounded-2xl shadow-xl p-8 bg-linear-to-br from-white via-green-50 to-green-100 backdrop-blur-md">
        <div className="flex flex-col items-center gap-4">
          <img
            src={crntuser?.photoURL}
            alt="profile"
            className="w-28 h-28 rounded-full shadow-md border-2 border-green-300"
          />

          <h2 className="text-3xl font-semibold flex items-center gap-2">
            {crntuser?.displayName}

            {crntuser?.status === "Premium" && (
              <span className="badge badge-warning text-black font-semibold">
                ⭐ Premium
              </span>
            )}
          </h2>
          <p className="text-gray-700 text-lg">{crntuser?.email}</p>

          <div className="mt-1 flex flex-col items-center">
            <span
              className={
                crntuser?.status === "Premium"
                  ? "badge badge-success text-white"
                  : crntuser?.status === "Pending"
                  ? "badge badge-warning"
                  : crntuser?.status === "Blocked"
                  ? "badge badge-error text-white"
                  : "badge badge-outline"
              }
            >
              {crntuser?.status || "Regular"}
            </span>
            {crntuser.status === "Blocked" && (
              <p className="text-center mt-5">
                <span className="text-red-700 font-semibold">Warning! -- </span>
                {"  "}
                <span className="bg-red-700 text-white p-2 rounded-2xl">
                  Please Contact With the Authorities.
                </span>
              </p>
            )}
          </div>

          <div className="w-full border-t my-6 border-green-200"></div>

          <div className="w-full space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {crntuser?.displayName}
            </p>
            <p>
              <strong>Email:</strong> {crntuser?.email}
            </p>
            <p>
              <strong>Role: {crntuser.role}</strong>{" "}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(crntuser?.createdAt).toDateString()}
            </p>
          </div>

          <div className="w-full border-t my-6 border-green-200"></div>
          {/* Update Profile Button */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 ">
              <button onClick={()=>openUpdateUserModal(crntuser)} className="btn btn-primary text-white hover:bg-green-700">
            Update Profile
          </button>
          {/* Buttons */}
          {role === "user" && (
            <>
              <div className="flex gap-4">
                {/* Subscribe Button */}
                {crntuser?.status !== "Premium" && (
                  <button
                    onClick={handleSubscribe}
                    className="btn bg-yellow-500 text-black hover:bg-yellow-600"
                  >
                    Subscribe 1000৳
                  </button>
                )}
              </div>
            </>
          )}
          </div>
          
        </div>
      </div>
       {/* Update Modal */}
      <dialog
        ref={updateUserModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="card bg-white w-full mx-auto max-w-sm shrink-0 shadow-2xl p-5">
            <h3 className="text-center font-semibold text-3xl text-secondary">
              Update Staff
            </h3>
            <p className="text-center pt-3">
              Build a team to keep the city running smoothly.
            </p>
            <form
              onSubmit={handleSubmit(handleUpdateUser)}
              className="card-body"
            >
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input bg-green-200"
                  placeholder="Staff Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-sm font-medium mt-1">
                    Name is Required
                  </p>
                )}

                {/* Photo */}
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input bg-green-200"
                  placeholder="Your Photo"
                />
                {errors.photo?.type === "required" && (
                  <p className="text-red-500 text-sm font-medium mt-1">
                    Photo is Required
                  </p>
                )}
                <button type="submit" className="btn btn-neutral mt-4">
                  Update Staff
                </button>
              </fieldset>
            </form>
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

export default MyProfile;
