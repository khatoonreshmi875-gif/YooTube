import { Stats } from "../../models/chart.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const previousStats = asynchandler(async (req, res) => {
  const stats = await Stats.find({ user: req.user._id }).select("x y -_id");

  res.status(200).json(
    new ApiResponse(
      200,
      {
        stats,
      },
      "channels fetched successfully",
    ),
  );
});
