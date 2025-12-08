import React from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card bg-linear-to-b from-green-400 via-green-600 to-green-700 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-5">
      <h3 className="text-center font-semibold text-3xl text-secondary">
        Welcome to CivicReport
      </h3>
      <p className="text-center pt-3">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input bg-green-200"
            placeholder="Your Name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-200 text-sm font-medium mt-1">
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
          {errors.email?.type === "required" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Photo is Required
            </p>
          )}

          {/* email */}
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

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password "
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
            Register
          </button>
        </fieldset>
        <p className="font-medium">
          Already have an account?{" "}
          <Link className="text-secondary font-semibold" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
