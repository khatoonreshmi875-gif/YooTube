import mongoose from "mongoose";
import { Tweet } from "../../models/tweet.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { Subscription } from "../../models/subscription.model.js";
export const getTweetBySubscriber = asynchandler(async (req, res) => {
  const { page = 0 } = req.query;
  console.log("page of subscriber-tweet 👍", page);
  const userId = req.user._id;
  const subscriber = await Subscription.find({ subscriber: userId }).select(
    "channel",
  );
  const tweetOwner = subscriber.map((m) => m.channel);

  const tweetCount = await Tweet.countDocuments({ owner: { $in: tweetOwner } });
  const subscribedPage = Math.ceil(tweetCount / 4);
  if (tweetOwner.length > 0) {
    if (page < subscribedPage) {
      const tweets = await Tweet.find({ owner: { $in: tweetOwner } })
        .populate({ path: "owner", select: "channelName avatar _id" })
        .populate({ path: "video", select: "videoFile" })
        .sort({ createdAt: -1 })
        .skip(parseInt(page) * 4)
        .limit(4);

      return res
        .status(200)
        .json(new ApiResponse(200, tweets, "subscribed tweets found"));
    }

    const generalPage = page - subscribedPage;
    const tweet = await Tweet.find({ owner: { $nin: tweetOwner } })
      .populate({ path: "owner", select: "channelName avatar _id" })
      .populate({ path: "video", select: "videoFile" })
      .sort({ createdAt: -1 })
      .skip(parseInt(generalPage) * 4)
      .limit(4);

    if (tweet.length > 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, tweet, "subscribed tweets found"));
    }

    // ✅ Explicitly stop here if subscribed tweets are exhausted
    return res
      .status(200)
      .json(new ApiResponse(200, [], "no more subscribed tweets"));
  }

  const tweet = await Tweet.find()
    .populate({ path: "owner", select: "channelName avatar _id" })
    .populate({ path: "video", select: "videoFile" })
    .sort({ createdAt: -1 })
    .skip(parseInt(page) * 7)
    .limit(7);

  return res.status(200).json(new ApiResponse(200, tweet, "tweets found"));
});
