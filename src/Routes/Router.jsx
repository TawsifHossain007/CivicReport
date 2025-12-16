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
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import StaffManagement from "../Pages/Dashboard/StaffManagement/StaffManagement";
import IssueDetails from "../Pages/IssueDetails/IssueDetails";
import IssueManagement from "../Pages/Dashboard/IssueManagement/IssueManagement";
import AssignedIssue from "../Pages/Dashboard/AssignedIssue/AssignedIssue";

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
            path: '/issue-details/:id',
            element: <PrivateRoute><IssueDetails></IssueDetails></PrivateRoute>
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
            index: true,
            Component: DashboardHome
        },
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
        {
            path: 'user-management',
            Component: UserManagement
        },
        {
            path: 'staff-management',
            Component: StaffManagement
        },
        {
            path: 'issue-management',
            Component: IssueManagement
        },
        {
            path: 'assigned-issues',
            Component: AssignedIssue
        }
    ]
  }

]);