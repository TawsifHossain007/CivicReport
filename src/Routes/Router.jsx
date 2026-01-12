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
import AdminRoutes from "./AdminRoutes";
import StaffRoutes from "./StaffRoutes";
import PaymentSuccess from "../Components/Payment-Success/PaymentSuccess";
import PaymentCancel from "../Components/Payment-Cancelled/PaymentCancel";
import UserRoutes from "./UserRoutes";
import BoostPaymentSuccess from "../Components/Payment-Success/BoostPaymentSuccess";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";

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
            Component: IssueDetails
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
            element: <UserRoutes><MyIssues></MyIssues></UserRoutes>
        },
        {
            path: 'report-issue',
            element: <UserRoutes><ReportIssue></ReportIssue></UserRoutes>
        },
        {
            path: 'my-profile',
            Component: MyProfile
        },
        {
            path: 'user-management',
            element: <AdminRoutes><UserManagement></UserManagement></AdminRoutes>
        },
        {
            path: 'staff-management',
            element: <AdminRoutes><StaffManagement></StaffManagement></AdminRoutes>
        },
        {
            path: 'issue-management',
            element: <AdminRoutes><IssueManagement></IssueManagement></AdminRoutes>
        },
        {
            path: 'payment-history',
            element: <AdminRoutes><PaymentHistory></PaymentHistory></AdminRoutes>
        },
        {
            path: 'assigned-issues',
            element: <StaffRoutes><AssignedIssue></AssignedIssue></StaffRoutes>
        },
        {
            path: 'payment-success',
            Component: PaymentSuccess
        },
        {
            path: 'payment-cancel',
            Component: PaymentCancel
        },
        {
            path: 'boost-payment-success',
            Component: BoostPaymentSuccess
        }
    ]
  }

]);