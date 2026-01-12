import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Failed",
          text: err.message,
          showConfirmButton: true,
        });
      });
  };
  const handleAdminFill = () => {
    setValue("email", "kevin@gmail.com");
    setValue("password", "T@wsif");
  };

  const handleUserFill = () => {
    setValue("email", "hazardbhai@gmail.com");
    setValue("password", "T@wsif");
  };

  const handleStaffFill = () => {
    setValue("email", "phstaff@gmail.com");
    setValue("password", "PHte@m");
  };

  return (
    <div className="card bg-linear-to-b from-green-400 via-green-600 to-green-700 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-5">
      <h3 className="text-center font-semibold text-3xl text-secondary">
        Welcome back
      </h3>
      <p className="text-center">Please Login</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
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
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input bg-green-200"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-200 text-sm font-medium mt-1">
              Password must be 6 characters or longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p className="font-medium">
          New to Zapshift?{" "}
          <Link className="text-secondary font-semibold" to={"/register"}>
            Register
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
      <div className="space-y-2">
        <button
          onClick={handleAdminFill}
          className="btn btn-soft btn-success  w-full"
        >
          Autofill Admin Credentials
        </button>
        <button
          onClick={handleUserFill}
          className="btn btn-soft btn-success  w-full"
        >
          Autofill User Credentials
        </button>
        <button
          onClick={handleStaffFill}
          className="btn btn-soft btn-success  w-full"
        >
          Autofill Staff Credentials
        </button>
      </div>
    </div>
  );
};

export default Login;
