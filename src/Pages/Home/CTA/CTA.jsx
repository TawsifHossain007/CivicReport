import React from 'react';
import { FaCity, FaCheckCircle, FaCheck } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Small subtitle */}
        <p className="text-sm md:text-base text-gray-500 uppercase tracking-widest mb-5">
          Civic Engagement
        </p>

        {/* Main heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-green-900 text-center mb-6">
          Make Your Voice Heard
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-24 h-1 bg-primary rounded-full"></span>
        </h2>

        {/* Description */}
        <p className="text-green-800 text-center mb-12 max-w-2xl mx-auto">
          CivicReport connects citizens with local authorities to report issues, 
          share feedback, and drive real change in the community. Every report you 
          submit helps make the city safer, cleaner, and more efficient.
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 mt-20 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex bg-white p-8 rounded-lg flex-col items-center text-center">
            <FaCheckCircle className="text-primary w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 mb-1">Quick Reporting</h3>
            <p className="text-gray-600 text-sm">Report issues in just a few clicks.</p>
          </div>
          <div className="flex bg-white p-8 rounded-lg flex-col items-center text-center">
            <FaCheckCircle className="text-primary w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 mb-1">Real Impact</h3>
            <p className="text-gray-600 text-sm">See how your reports help authorities act faster.</p>
          </div>
          <div className="flex bg-white p-8 rounded-lg flex-col items-center text-center">
            <FaCheckCircle className="text-primary w-10 h-10 mb-3" />
            <h3 className="font-semibold text-lg text-gray-900 mb-1">Community Driven</h3>
            <p className="text-gray-600 text-sm">Collaborate with others to improve the city.</p>
          </div>
        </div>

        <div className="flex justify-center mt-12 opacity-30">
  <FaCheck className="w-16 h-16 text-secondary" />
</div>
      </div>
    </section>
  );
};

export default CTA;
