import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { TfiWrite } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";

const StaffManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddstaffModal = () => setIsModalOpen(true);
  const closeAddStaffModal = () => setIsModalOpen(false);

  const handleAddStaff = async (data) => {
    try {
      const profileImg = data.photo[0];

      // 1️⃣ Create Firebase user
      await registerUser(data.email, data.password);

      // 2️⃣ Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);
      const ImageApiURL = `https://api.imgbb.com/1/upload?&key=${
        import.meta.env.VITE_Image_Host_Key
      }`;
      const imgRes = await axios.post(ImageApiURL, formData);
      const photoURL = imgRes.data.data.url;

      // 3️⃣ Create staff in DB
      const staffInfo = {
        email: data.email,
        contact: data.contact,
        displayName: data.name,
        photoURL: photoURL,
        role: "staff",
        AddedBy: user.displayName,
      };
      await axiosSecure.post("/staffs", staffInfo);

      // 4️⃣ Update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL });

      // 5️⃣ Success message
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Staff Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      closeAddStaffModal();
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to add staff",
        text: err.message,
        showConfirmButton: true,
      });
      navigate("/dashboard/staff-management");
    }
  };

  const handleDeleteStaff = (id) => {
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
              axiosSecure.delete(`/staffs/${id}`).then((res) => {
                if (res.data.deletedCount) {
                  refetch();
    
                  swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text:  `Staff has been deleted.`,
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
                text: "Staff has not been deleted",
                icon: "error",
              });
            }
          });
  }

  const { refetch,data: staffs = [] } = useQuery({
    queryKey: ["staff-management"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs");
      return res.data;
    },
  });

  return (
    <div className="my-20 mx-15">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="font-bold text-3xl">Staff Management</h1>
        <button
          onClick={openAddstaffModal}
          className="btn bg-green-500 text-white rounded-xl"
        >
          <FaPlus /> Add staff
        </button>
      </div>

      <div className="overflow-x-auto mt-15">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Contact No.</th>
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
                <td>
                  {staff.contact}
                  <br />
                </td>
                <td className="font-bold">{staff.email}</td>
                <th>
                                      <div className="tooltip" data-tip="Update Staff">
                                        <button
                                          className="mr-2 btn btn-warning text-black"
                                        >
                                          <TfiWrite />
                                        </button>
                                      </div>
                                      <div className="tooltip" data-tip="Delete Staff">
                                        <button
                                        onClick={()=>handleDeleteStaff(staff._id)}
                                          className="btn btn-error text-black"
                                        >
                                          <MdDelete />
                                        </button>
                                      </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal modal-bottom sm:modal-middle modal-open">
          <div className="card bg-white w-full mx-auto max-w-sm shrink-0 shadow-2xl p-5">
            <h3 className="text-center font-semibold text-3xl text-secondary">
              Add Staff
            </h3>
            <p className="text-center pt-3">
              Build a team to keep the city running smoothly.
            </p>
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeAddStaffModal}
            >
              ✕
            </button>
            <form onSubmit={handleSubmit(handleAddStaff)} className="card-body">
              <fieldset className="fieldset">
                {/* name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input bg-green-200"
                  placeholder="Staff Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-200 text-sm font-medium mt-1">
                    Name is Required
                  </p>
                )}

                {/* Contact */}
                <label className="label">Contact No.</label>
                <input
                  type="text"
                  {...register("contact", { required: true })}
                  className="input bg-green-200"
                  placeholder="Staff Contact No."
                />
                {errors.contact?.type === "required" && (
                  <p className="text-red-200 text-sm font-medium mt-1">
                    Contact No. is Required
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
                  <p className="text-red-200 text-sm font-medium mt-1">
                    Photo is Required
                  </p>
                )}

                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input bg-green-200"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-200 text-sm font-medium mt-1">
                    Email is Required
                  </p>
                )}

                {/* Password */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input bg-green-200"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-200 text-sm font-medium mt-1">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-200 text-sm font-medium mt-1">
                    Password must be 6 characters or longer
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-200 text-sm font-medium mt-1">
                    Password doesn't contain enough requirements
                  </p>
                )}
                <button type="submit" className="btn btn-neutral mt-4">
                  Add Staff
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
