import React from "react";

import { Outlet } from "react-router";
import Logo from "../../Components/Logo/Logo";
import mechanicImg from '../../assets/Mechanic-removebg-preview.png'

const AuthLayout = () => {
  return (
    <div className="bg-green-50">
         <div className="max-w-7xl mx-auto">
      <Logo></Logo>
      <div className="flex items-center min-h-screen">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 hidden md:block">
          <img className="h-800px] w-[1200px]"
            src={mechanicImg}
            alt=""
          />
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default AuthLayout;
