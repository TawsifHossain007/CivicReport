import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const feedbacks = [
  {
    name: "Rahim Ahmed",
    location: "Dhaka, Bangladesh",
    comment: "The pothole on my street was fixed within 48 hours! This platform really works.",
  },
  {
    name: "Sara Khan",
    location: "Chittagong, Bangladesh",
    comment: "I reported a broken streetlight and it was repaired promptly. Very transparent process!",
  },
  {
    name: "Jamil Hossain",
    location: "Sylhet, Bangladesh",
    comment: "Easy to use and very effective. Citizens can truly make a difference.",
  },
  {
    name: "Nadia Rahman",
    location: "Khulna, Bangladesh",
    comment: "Reporting garbage overflow has never been easier. The response is fast and reliable!",
  },
  {
    name: "Tariq Islam",
    location: "Rajshahi, Bangladesh",
    comment: "I love how I can track my report and see updates in real-time. Very user-friendly.",
  },
  {
    name: "Fatima Zahan",
    location: "Barishal, Bangladesh",
    comment: "A fantastic initiative for citizens. The city is becoming cleaner and safer thanks to this platform.",
  },
];

const FeedBacks = () => {
  return (
    <div className="w-11/12 mx-auto bg-green-50">
      <h2 className="text-3xl lg:text-4xl font-bold text-green-900 text-center mb-6">
        What Citizens Are Saying
      </h2>
      <p className="text-green-800 text-center mb-12 max-w-2xl mx-auto">
        Our platform empowers citizens to report issues and improve their communities. Here's what some of them have to say:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {feedbacks.map((feedback, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform">
            <div className="text-primary text-4xl mb-4">
              <FaQuoteLeft />
            </div>
            <p className="text-green-700 italic mb-4">
              "{feedback.comment}"
            </p>
            <h3 className="text-green-900 font-semibold">{feedback.name}</h3>
            <p className="text-green-800 text-sm">{feedback.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedBacks;
