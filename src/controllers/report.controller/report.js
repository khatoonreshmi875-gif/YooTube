import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { Report } from "../../models/report.model.js";
export const postReport = asynchandler(async (req, res) => {
  const { content } = req.body;
  const { userId } = req.params;
  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "Content required" });
  }

  const report = await Report.create({
    content,
    reportedBy: userId,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, report, "report Successfully"));
});
