import { Comment } from "../../models/comments.model.js";
import { Like } from "../../models/likes.model.js";
import { Subscription } from "../../models/subscription.model.js";
import { Tweet } from "../../models/tweet.model.js";
import { User } from "../../models/user.model.js";
import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const totalSubscriber = asynchandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select(
    "subscribedToCount subscriberCount",
  );
  const [subscribe, subscribedChannels] = await Promise.all([
    Subscription.find({
      channel: userId,
    })
      .populate({
        path: "subscriber",
        select: "_id",
      })
      .lean()
      .select("subscriber  "),
    Subscription.find({
      subscriber: userId,
    })
      .populate({
        path: "channel",
        select: "_id",
      })
      .lean()
      .select("channel"),
  ]);
  const video = await Video.distinct("_id", { owner: userId });
  const tweet = await Tweet.distinct("_id", {
    owner: userId,
  });
  const VideoAllLike = await Like.countDocuments({
    $or: [{ video: { $in: video } }, { tweet: { $in: tweet } }],
  });
  const AllComment = await Comment.countDocuments({ owner: userId });
  const subscriber = await Promise.all(
    subscribe.map(async (m) => {
      const VideoLike = await Like.countDocuments({
        video: { $in: video },
        likedBy: m?.subscriber?._id,
      });
      const TweetLike = await Like.countDocuments({
        tweet: { $in: tweet },
        likedBy: m?.subscriber?._id,
      });
      const comment = await Comment.countDocuments({
        video: { $in: video },
        owner: m.subscriber?._id,
      });
      const user = await User.findById(m?.subscriber?._id)
        .select("avatar channelName")
        .lean();
      return {
        ...m?.subscriber,
        VideoLike,
        TweetLike,
        commentVideo: comment,
        userInfo: user,
      };
    }),
  );
  const subscriberOfEachChannel = await Promise.all(
    subscribedChannels.map(async (m) => {
      const subscribers = await Subscription.countDocuments({
        channel: m?.channel?._id,
      });
      const user = await User.findById(m?.channel?._id)
        .select("channelName")
        .lean();
      return {
        ...m?.channel,
        userInfo: user,
        subscriberCount: subscribers,
      };
    }),
  );
  res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        subscriberOfEachChannel,
        subscriber,
        VideoAllLike,
        AllComment,
        date: new Date().toLocaleDateString(),
      },
      "videos fetched successfully ",
    ),
  );
});
