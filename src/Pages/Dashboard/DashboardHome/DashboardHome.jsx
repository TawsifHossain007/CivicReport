import React from 'react';
import useRole from '../../../hooks/useRole/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import StaffDashboardHome from './StaffDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {

    const {role, roleLoading} = useRole()
    if(roleLoading){
    return (
        <div className='flex items-center justify-center'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    )
}

    if(role === 'admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if(role === 'staff'){
        return <StaffDashboardHome></StaffDashboardHome>
    }
    else if(role === 'user'){
        return <UserDashboardHome></UserDashboardHome>
    }



    return (
        <div className='min-h-screen p-8'>
            <h2 className='font-bold text-3xl'>Dashboard Home</h2>
        </div>
    );
};

export default DashboardHome;