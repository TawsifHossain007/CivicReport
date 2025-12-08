import React from "react";
import { FaPencilAlt, FaCheckCircle, FaUsers, FaTools } from "react-icons/fa";

const steps = [
  {
    icon: <FaPencilAlt />,
    title: "Report an Issue",
    description:
      "Submit any public infrastructure issue quickly using our easy-to-use form.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Verify",
    description: "Our team verifies the issue and ensures accurate reporting.",
  },
  {
    icon: <FaUsers />,
    title: "Assign",
    description:
      "The verified issue is assigned to the responsible staff for resolution.",
  },
  {
    icon: <FaTools />,
    title: "Resolve",
    description: "The issue is fixed, and the status is updated transparently.",
  },
];

const HowItWorks = () => {
  return (
    <div className="w-11/12 mx-auto py-16">
      <div className="text-center  mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-green-900 text-center mb-3">
          How It Works
        </h2>
        <p className="font-normal text-gray-700">
          Our platform makes it easy for citizens to contribute to a smarter,
          safer city. Simply report any public infrastructure issue, and our
          team <br /> will verify, assign, and ensure it gets resolved efficiently.
          Track the progress of each report and stay informed—because improving
          your city starts with your voice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <div className="text-primary text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              {step.title}
            </h3>
            <p className="text-green-700 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
