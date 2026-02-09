import React from "react";
import { useNavigate } from "react-router-dom";

const ReportTable = ({reports}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="overflow-x-auto hidden lg:block">
        <table className="min-w-full border border-gray-700 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-cyan-800 via-slate-800 to-cyan-900 text-white font-serif">
            <tr>
              <th className="p-3 text-center">Video Title</th>
              <th className="p-3 text-center">Video Owner</th>
              <th className="p-3 text-center">Content</th>
              <th className="p-3 text-center">Reported By</th>
              <th className="p-3 text-center">Created At</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report._id}
                className={`${
                  index % 2 === 0
                    ? "bg-gradient-to-tr from-black via-slate-900 to-black"
                    : "bg-gradient-to-tr from-black via-cyan-950 to-black"
                } hover:bg-cyan-700 transition text-white`}
              >
                <td className="border p-3 font-semibold">
                  {report.video?.title || "No Title"}
                </td>
                <td className="p-3 flex gap-1">
                  <img
                    src={report.video?.owner?.avatar}
                    alt="owner avatar"
                    className="w-8 h-8 rounded-full ring-2 ring-cyan-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/curr-user/${report.video.owner._id}/video`)
                    }
                  />
                  <span className="truncate">
                    {report.video?.owner?.channelName || "No Owner"}
                  </span>
                </td>
                <td className="border p-3 italic text-gray-300">
                  {report.content || "No Content"}
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={report.reportedBy?.avatar}
                    alt="reporter avatar"
                    className="w-8 h-8 rounded-full ring-2 ring-yellow-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/curr-user/${report.reportedBy._id}/video`)
                    }
                  />
                  <span className="truncate">
                    {report.reportedBy?.channelName || "No Reporter"}
                  </span>
                </td>
                <td className="border p-3 text-sm text-gray-400">
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleString()
                    : "No Date"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
