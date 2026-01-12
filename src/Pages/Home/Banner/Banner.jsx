import React from 'react';
import { motion } from 'framer-motion';
import { FaRoad, FaLightbulb, FaTint, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative w-full h-screen bg-green-50 flex items-center justify-center overflow-hidden">
      
      {/* Animated floating issue icons */}
      <motion.div
        className="absolute top-20 left-10 text-green-400 text-4xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaRoad />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-green-500 text-4xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaLightbulb />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-1/3 text-green-600 text-4xl"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaTint />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-1/4 text-green-700 text-4xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaTrash />
      </motion.div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-center lg:text-left max-w-2xl px-4"
      >
        <h1 className="text-4xl lg:text-6xl font-bold text-green-900 mb-4">
          Report Issues. Improve Your City.
        </h1>
        <p className="text-primary text-lg lg:text-xl mb-6">
          Fast, Transparent, and Efficient Public Infrastructure Reporting
        </p>
        <div className="flex justify-center lg:justify-start gap-4">
          <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
            <Link to={"/dashboard/report-issue"}>Report an Issue</Link>
            
          </button>
          <button className="bg-white text-green-700 px-6 py-3 rounded-lg hover:bg-green-100 transition">
            <Link to={'/all-issues'}>View All Issues</Link>
          </button>
        </div>
      </motion.div>

      {/* Optional Background Illustration */}
      <div className="absolute bottom-0 right-0 opacity-20 w-96 h-96 bg-[url('/images/city-bg.svg')] bg-contain bg-no-repeat"></div>
    </div>
  );
};

export default Banner;
