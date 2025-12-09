import React from "react";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdReportGmailerrorred } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className=" bg-green-50">
      <div className=" dashboard  drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbarw-full bg-linear-to-r from-green-700 via-green-600 to-green-400">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 font-bold text-2xl text-white">
              CivicReport Dashboard
            </div>
          </nav>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">HomePage</span>
                </Link>
              </li>

              {/* Our Dashboard Links */}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Issues"
                  to={"/dashboard/my-issues"}
                >
                  <AiOutlineIssuesClose>
                    stroke="currentColor" className="my-1.5 inline-block size-4"
                  </AiOutlineIssuesClose>
                  <span className="is-drawer-close:hidden">My Issues</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Report Issues"
                  to={"/dashboard/report-issue"}
                >
                  <MdReportGmailerrorred>
                    stroke="currentColor" className="my-1.5 inline-block size-4"
                  </MdReportGmailerrorred>
                  <span className="is-drawer-close:hidden">Report Issues</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Profile"
                  to={"/dashboard/my-profile"}
                >
                  <CgProfile>
                    stroke="currentColor" className="my-1.5 inline-block size-4"
                  </CgProfile>
                  <span className="is-drawer-close:hidden">My Profile</span>
                </NavLink>
              </li>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
