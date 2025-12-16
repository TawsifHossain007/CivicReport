import React from 'react';
import { FaBan } from 'react-icons/fa';

const Blocked = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
        <FaBan className="text-red-600 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          Your account has been blocked. Please contact the authorities for assistance.
        </p>
        <button
          className="btn bg-green-600 text-white hover:bg-red-700 transition-colors rounded-full px-6 py-2"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Blocked;
