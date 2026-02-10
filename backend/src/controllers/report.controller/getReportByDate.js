import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { Report } from "../../models/report.model.js";
export const getReportByDate = asynchandler(async (req, res) => {
  const { choosenDate } = req.body;
  console.log(choosenDate);
  const date = new Date(choosenDate);
  const start = new Date(date.setHours(0, 0, 0, 0));
  const end = new Date(date.setHours(23, 59, 59, 999));

  const report = await Report.find({ createdAt: { $gte: start, $lte: end } })
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

  return res
    .status(201)
    .json(new ApiResponse(200, report, " get report Successfully"));
});
