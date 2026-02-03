import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { Report } from "../../models/report.model.js";
export const getReport = asynchandler(async (req, res) => {
  const report = await Report.find()
    .populate("reportedBy")
    .select("avatar channelName")
    .lean();
  return res
    .status(201)
    .json(new ApiResponse(200, report, " get report Successfully"));
});
