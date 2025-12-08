import React from "react";
import { Link } from "react-router";

const ErrorApps = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-0 md:mt-16">
      <img src="https://i.ibb.co.com/WpKsKHxf/Screenshot-8-12-2025-211611-www-freepik-com.png" alt="" />
      <h1 className="font-semibold text-[24px] md:text-[48px] mt-10 text-green-800">
        OPPS!! APP NOT FOUND
      </h1>
      <p className="font-normal text-[20px] text-gray-700 mt-2 text-center">
        The route you are requesting is not found on our system. please try a
        different route
      </p>
      <button className=" bg-linear-to-r font-medium from-green-700  to-green-400 text-white py-3 px-8 rounded-lg mt-6 cursor-pointer">
        {" "}
        <Link to="/">Go Back!</Link>
      </button>
    </div>
  );
};

export default ErrorApps;
