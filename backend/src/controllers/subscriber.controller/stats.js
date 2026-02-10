import { Stats } from "../../models/chart.model.js";
import { Subscription } from "../../models/subscription.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const stats = asynchandler(async (req, res) => {
  const channel = await Subscription.countDocuments({ channel: req.user._id });
  const dates = new Date().toLocaleString("en-US");
  const dateObj = dates.split(",")[0];
  await Stats.findOneAndDelete({ x: dateObj, user: req.user._id });
  const stats = await Stats.create({
    y: channel,
    x: dateObj,
    user: req.user._id,
  });
  res.status(200).json(
    new ApiResponse(
      200,
      [
        {
          x: dateObj,
          y: channel,
        },
      ],

      "channels fetched successfully",
    ),
  );
});
