import { Subscription } from "../../models/subscription.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const stateOfSubscribeBtn = asynchandler(async (req, res) => {
  const { channelId } = req.params;
  const subscribe = await Subscription.findOne({
    channel: channelId,
    subscriber: req.user._id,
  }).lean();

  if (!subscribe) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { isSubscribed: false },
          " User is not subscribed ",
        ),
      );
  }
  res
    .status(200)
    .json(new ApiResponse(200, { isSubscribed: true }, `User is subscribed`));
});
