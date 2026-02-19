import React from "react";
import { useNavigate } from "react-router-dom";

const ReportCard = ({ report }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Video Title */}
      <h3 className="font-semibold text-blue-600 mb-3 text-lg">
        🎬 {report.video?.title || "No Title"}
      </h3>

      {/* Complaint Relationship */}
      <p className="text-sm text-red-500 mb-4">
        <span className="font-semibold text-slate-700">
          {report.reportedBy?.channelName || "Unknown"}
        </span>{" "}
        complained against{" "}
        <span className="font-semibold text-slate-900">
          {report.video?.owner?.channelName || "Unknown"}
        </span>
      </p>

      {/* Video Owner */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-slate-600">Owner:</span>
        <img
          src={report.video?.owner?.avatar}
          alt="owner avatar"
          className="w-10 h-10 rounded-full ring-2 ring-blue-300 cursor-pointer"
          onClick={() => navigate(`/curr-user/${report.video.owner._id}/video`)}
        />
        <span className="truncate text-slate-800">
          {report.video?.owner?.channelName || "No Owner"}
        </span>
      </div>

      {/* Complaint Content */}
      <p className="italic text-slate-500 mb-3">
        {report.content || "No Content"}
      </p>

      {/* Reporter */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-slate-600">Reporter:</span>
        <img
          src={report.reportedBy?.avatar}
          alt="reporter avatar"
          className="w-10 h-10 rounded-full ring-2 ring-blue-300 cursor-pointer"
          onClick={() => navigate(`/curr-user/${report.reportedBy._id}/video`)}
        />
        <span className="truncate text-slate-800">
          {report.reportedBy?.channelName || "No Reporter"}
        </span>
      </div>

      {/* Date */}
      <p className="text-xs text-slate-400">
        {report.createdAt
          ? new Date(report.createdAt).toLocaleString()
          : "No Date"}
      </p>
    </div>
  );
};

export default ReportCard;