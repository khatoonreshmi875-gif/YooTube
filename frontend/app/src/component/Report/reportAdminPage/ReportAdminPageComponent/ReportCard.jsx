import React from 'react'
import { useNavigate } from 'react-router-dom';

const ReportCard = ({report}) => {
  const navigate=useNavigate()
  return (
    <div>
      <h3 className="font-semibold text-cyan-400 mb-3 text-lg">
        🎬 {report.video?.title || "No Title"}
      </h3>

      {/* Complaint Relationship */}
      <p className="text-sm text-red-400 mb-4">
        <span className="font-semibold text-yellow-400">
          {report.reportedBy?.channelName || "Unknown"}
        </span>{" "}
        complained against{" "}
        <span className="font-semibold text-cyan-400">
          {report.video?.owner?.channelName || "Unknown"}
        </span>
      </p>

      {/* Video Owner */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gray-300">Owner:</span>
        <img
          src={report.video?.owner?.avatar}
          alt="owner avatar"
          
          className="w-10 h-10 rounded-full ring-2 ring-cyan-500 cursor-pointer"
          onClick={() => navigate(`/curr-user/${report.video.owner._id}/video`)}
        />
        <span className="truncate">
          {report.video?.owner?.channelName || "No Owner"}
        </span>
      </div>

      {/* Complaint Content */}
      <p className="italic text-gray-400 mb-3">
        {report.content || "No Content"}
      </p>

      {/* Reporter */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-gray-300">Reporter:</span>
        <img
          src={report.reportedBy?.avatar}
          alt="reporter avatar"
          className="w-10 h-10 rounded-full ring-2 ring-yellow-500 cursor-pointer"
          onClick={() => navigate(`/curr-user/${report.reportedBy._id}/video`)}
        />
        <span className="truncate">
          {report.reportedBy?.channelName || "No Reporter"}
        </span>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500">
        {report.createdAt
          ? new Date(report.createdAt).toLocaleString()
          : "No Date"}
      </p>
    </div>
  );
}

export default ReportCard
