import React from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/all-issues"}>All Issues</NavLink>
      </li>
      <li>
        <NavLink to={"/aboutUs"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/support"}>Support</NavLink>
      </li>
    </>
  );

  return (
    <div className="w-11/12 mx-auto">
      <div className="navbar bg-white shadow-sm">
        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <a className="btn btn-ghost text-xl">
            <Logo />
          </a>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          {/* Avatar Dropdown */}
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[999] menu p-4 shadow-lg bg-base-100 rounded-xl w-72 
                 backdrop-blur-lg border border-base-300"
              >
                <li className="text-center flex flex-col items-center">
                  <img
                    src={user.photoURL}
                    className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2 mb-2"
                    alt="User"
                  />

                  <h3 className="font-bold text-lg">{user.displayName}</h3>
                  <p className="text-sm opacity-70">{user.email}</p>
                </li>

                <div className="divider"></div>

                <li>
                  <button
                    className="btn btn-primary w-full text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button
                    className="btn btn-primary w-full text-black mt-2"
                    
                  >
                    Update Profile
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Logout or Login/Register */}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-primary text-black"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <Link to={"/login"} className="btn btn-primary text-black">
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn btn-primary text-black"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
