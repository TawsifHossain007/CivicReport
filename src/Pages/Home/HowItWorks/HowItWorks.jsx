import React from "react";
import { FaRegEdit, FaPaperPlane, FaBell, FaCheck } from "react-icons/fa";

const steps = [
  {
    icon: <FaRegEdit />,
    title: "Report Issue",
    description: "Submit your issue quickly with details and photos.",
  },
  {
    icon: <FaPaperPlane />,
    title: "Verify & Assign",
    description: "Our team checks the report and assigns staff.",
  },
  {
    icon: <FaBell />,
    title: "Track Progress",
    description: "Monitor updates on your report in real-time.",
  },
  {
    icon: <FaCheck />,
    title: "Issue Resolved",
    description: "The issue is resolved and marked completed.",
  },
];

const HowItWorks = () => {
  return (
    <div className="w-11/12 mx-auto py-20 bg-green-50">
      <div className="mb-12">
        <h2 className="text-3xl lg:text-4xl mb-5 font-bold text-green-900 text-center">
          How It Works
        </h2>
        <p className="text-green-800 text-center mb-16 max-w-2xl mx-auto">
          Follow these steps to report and resolve public issues efficiently.
        </p>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between lg:space-x-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center mb-12 lg:mb-0"
          >
            <div className="bg-primary text-white w-16 h-16 flex items-center justify-center rounded-full text-3xl mb-4 z-10">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              {step.title}
            </h3>
            <p className="text-green-700 max-w-xs">{step.description}</p>

            {/* Connector line except for last step */}
            {index !== steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[calc(25%*{index+1})] w-[25%] h-1 bg-green-300 z-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
