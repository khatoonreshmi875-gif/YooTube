import { Subscription } from "../../models/subscription.model.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import client from "../../utils/redis.js";
import { subscriberInvalidate } from "../../utils/subscriberInvalidate.js";
export const toggleSubcribe = asynchandler(async (req, res) => {
  let { channelId } = req.params;
  //console.log("channelId",channelId)
  if (!channelId) {
    channelId = req.user._id;
  }

  const existedUser = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  }).lean();
  let subscribers;
  let subscribed;

  if (existedUser) {
    [, subscribers, subscribed] = await Promise.all([
      await Subscription.deleteOne({ _id: existedUser._id }),
      await User.findByIdAndUpdate(
        channelId,
        {
          $inc: {
            subscriberCount: -1,
          },
        },
        {
          new: true,
        },
      )
        .select(" subscriberCount")
        .lean(),
      await User.findByIdAndUpdate(
        req.user._id,

        {
          $inc: {
            subscribedToCount: -1,
          },
        },
        {
          new: true,
        },
      )
        .select(" subscribedToCount")
        .lean(),
    ]);
  } else {
    [, subscribers, subscribed] = await Promise.all([
      await Subscription.create({
        subscriber: req.user._id,
        channel: channelId,
      }),
      await User.findByIdAndUpdate(
        channelId,
        {
          $inc: {
            subscriberCount: 1,
          },
        },
        {
          new: true,
        },
      )
        .select(" subscriberCount")
        .lean(),
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: {
            subscribedToCount: 1,
          },
        },
        {
          new: true,
        },
      )
        .select(" subscribedToCount")
        .lean(),
      ,
    ]);
  }
  await subscriberInvalidate(channelId, req.user._id);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { subscriber: !existedUser, subscribers, subscribed },
        `Subscription ${existedUser ? "removed" : "added"} successfully`,
      ),
    );
});
