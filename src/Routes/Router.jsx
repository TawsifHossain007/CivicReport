import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Home from "../Pages/Home/Home";
import AllIssues from "../Pages/AllIssues/AllIssues";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Support from "../Pages/Support/Support";
import ErrorApps from "../Pages/Error/Error";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyIssues from "../Pages/Dashboard/MyIssues/MyIssues";
import ReportIssue from "../Pages/Dashboard/ReportIssue/ReportIssue";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorApps></ErrorApps>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'all-issues',
            Component: AllIssues
        },
        {
            path: 'aboutUs',
            Component: AboutUs
        },
        {
            path: 'support',
            Component: Support
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
        {
            path: '/login',
            Component: Login
        },
        {
            path: 'register',
            Component: Register
        }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
        {
            path: 'my-issues',
            Component: MyIssues
        },
        {
            path: 'report-issue',
            Component: ReportIssue
        },
        {
            path: 'my-profile',
            Component: MyProfile
        },
    ]
  }

]);