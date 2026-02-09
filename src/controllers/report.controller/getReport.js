import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { Report } from "../../models/report.model.js";
export const getReport = asynchandler(async (req, res) => {
  const report = await Report.find()
    .populate({
      path: "reportedBy",
      select: " _id avatar channelName",
    })
    .populate({
      path: "video",
      select: "title thumbnail owner",
      populate: {
        path: "owner", // populate owner inside video
        select: "_id avatar channelName",
      },
    })
    .lean();
  console.log(report);

  return res
    .status(201)
    .json(new ApiResponse(200, report, " get report Successfully"));
});
