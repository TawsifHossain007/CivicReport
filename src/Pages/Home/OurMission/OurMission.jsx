import React from 'react';
import { FaCity } from 'react-icons/fa';

const OurMission = () => {
  return (
    <div className="w-full py-20 bg-gradient-to-r rounded-2xl from-green-200 to-green-400 text-gray-700 mb-12">
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-lg mb-6">
            We believe every citizen has the right to a safe and well-maintained city. 
            Our platform empowers people to report public issues, track their resolution, 
            and actively contribute to a smarter, more transparent urban environment.
          </p>
          <p className="text-base">
            By making reporting simple, transparent, and efficient, we aim to reduce 
            response times, improve accountability, and build stronger connections between 
            citizens and local authorities.
          </p>
        </div>

        {/* Illustration Section */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="text-black text-9xl opacity-20">
            <FaCity />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurMission;
