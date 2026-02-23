import { Subscription } from "../../models/subscription.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const stateOfSubscribeBtn = asynchandler(async (req, res) => {
  const { channelId } = req.params;
  const subscribe = await Subscription.findOne({
    channel: channelId,
    subscriber: req.user._id,
  }).lean();
  const result = await Subscription.deleteMany({ subscriber: null });
  console.log("DeleteMany result:", result); // { acknowledged: true, deletedCount: N }

  
  const subscribedToCount = await Subscription.countDocuments({
    subscriber: channelId,
  });
  const subscriberCount = await Subscription.countDocuments({
    channel: channelId,
  });
  const chanel = await Subscription.find({
    channel: channelId,
  }).populate("subscriber", "channelName username avatar _id"); // adjlean();
  if (!subscribe) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { isSubscribed: false, subscribedToCount, subscriberCount, chanel },
          " User is not subscribed ",
        ),
      );
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isSubscribed: true, subscribedToCount, subscriberCount, chanel },
        `User is subscribed`,
      ),
    );
});
