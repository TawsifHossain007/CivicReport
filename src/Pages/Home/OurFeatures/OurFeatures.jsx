import React from 'react';
import { FaPencilAlt, FaSearch, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const features = [
  {
    icon: <FaPencilAlt />,
    title: 'Easy Reporting',
    description: 'Submit issues quickly with our simple and user-friendly reporting form.'
  },
  {
    icon: <FaSearch />,
    title: 'Track Progress',
    description: 'Monitor the status of your reported issues in real-time.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Verified & Secure',
    description: 'All reports are verified by our team for accuracy and transparency.'
  },
  {
    icon: <FaCheckCircle />,
    title: 'Fast Resolution',
    description: 'Assigned staff resolves issues efficiently, keeping citizens informed.'
  }
];

const OurFeatures = () => {
  return (
    <div className="w-11/12 mx-auto py-20 bg-green-50">
      <h2 className="text-3xl lg:text-4xl font-bold text-green-900 text-center mb-6">
        Key Features
      </h2>
      <p className="text-green-800 text-center mb-16 max-w-2xl mx-auto">
        Our platform is designed to make public infrastructure reporting fast, reliable, and transparent.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-primary text-white w-16 h-16 flex items-center justify-center rounded-full text-3xl mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h3>
            <p className="text-green-700 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurFeatures;
