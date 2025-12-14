import { FaArrowUp, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  const {
    _id,
    title,
    category,
    image,
    IssueStatus,
    Priority,
    location,
    VoteCount
  } = issue;

  return (
   <div className="card rounded-2xl overflow-hidden 
  bg-gradient-to-br from-white via-green-50 to-green-100
  shadow-md hover:shadow-xl transition-all duration-300">

  {/* Image */}
  <figure className="h-56 overflow-hidden">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
    />
  </figure>

  {/* Body */}
  <div className="card-body p-6 space-y-4">
    {/* Title */}
    <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
      {title}
    </h2>

    {/* Category */}
    <p className="text-sm text-gray-600">
      {category}
    </p>

    {/* Status & Priority */}
    <div className="flex gap-2 flex-wrap">
      {IssueStatus === "Pending" ? (
        <span className="badge badge-warning badge-outline">Pending</span>
      ) : IssueStatus === "Resolved" ? (
        <span className="badge badge-success badge-outline">Resolved</span>
      ) : (
        <span className="badge badge-info badge-outline">In Progress</span>
      )}

      {Priority === "High" ? (
        <span className="badge badge-error badge-outline">High Priority</span>
      ) : (
        <span className="badge badge-outline">Normal</span>
      )}
    </div>

    {/* Location */}
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <FaMapMarkerAlt className="text-green-700" />
      <span className="line-clamp-1">{location}</span>
    </div>

    {/* Divider */}
    <div className="h-px bg-green-200/70" />

    {/* Footer */}
    <div className="flex items-center justify-between">
      {/* Upvote */}
      <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-700 transition">
        <FaArrowUp />
        <span>{VoteCount}</span>
      </button>

      {/* View Details */}
      <Link
        to={`/issues/${_id}`}
        className="btn btn-sm btn-outline rounded-full border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
      >
        View Details
      </Link>
    </div>
  </div>
</div>

  );
};

export default IssueCard;
