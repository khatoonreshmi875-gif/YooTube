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

  const tweets = await Tweet.find({ owner: { $in: tweetOwner } })

    .populate({ path: "owner", select: "channelName avatar _id" })
    .populate({ path: "video", select: "videoFile" })
    .sort({ createdAt: -1 })
    .skip(parseInt(page) * 7)
    .limit(7);

  console.log("tweets from subscribed owners count///////////////////:", tweets.length); // 4️⃣ how many tweets found
  if (tweets.length > 0) {
    console.log("sample subscribed tweet:", tweets[0]); // 5️⃣ inspect one document
  }
  
  if (tweetOwner.length === 0 || tweets.length === 0) {
    console.log("tweet is nothing");
    const tweet = await Tweet.aggregate([
      {
        $lookup: {
          from: "likes",
          foreignField: "tweet",
          localField: "_id",
          as: "tweetLikes",
        },
      },
      {
        $lookup: {
          from: "dislikes",
          foreignField: "tweet",
          localField: "_id",
          as: "tweetDislikes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $lookup: {
          from: "videos",
          foreignField: "_id",
          localField: "video",
          as: "video",
        },
      },
      { $unwind: "$owner" },
      { $addFields: { likeCount: { $size: "$tweetLikes" } } },
      { $sort: { likeCount: -1, createdAt: -1 } },
      { $skip: parseInt(page) * 5 },
      { $limit: 5 },
      {
        $project: {
          _id: 1,
          content: 1,
          image: 1,
          video: { videoFile: 1 },
          owner: {
            avatar: "$owner.avatar",
            channelName: "$owner.channelName",
            _id: "$owner._id",
          },
          tweetLikeCount: 1,
          tweetDislikeCount: 1,
          isLikedState: {
            $in: [
              new mongoose.Types.ObjectId(req.user._id),
              {
                $map: {
                  input: "$tweetLikes",
                  as: "t",
                  in: "$$t.likedBy",
                },
              },
            ],
          },
          isDislikedState: {
            $in: [
              new mongoose.Types.ObjectId(req.user._id),
              {
                $map: {
                  input: "$tweetDislikes",
                  as: "t",
                  in: "$$t.dislikedBy",
                },
              },
            ],
          },
          createdAt: 1,
        },
      },
    ]);
    console.log("aggregation result count:", tweet.length);
    //console.log("sample aggregation result:", tweet[0]);

    return res.status(200).json(new ApiResponse(200, tweet, "tweets found"));
  }

  return res.status(200).json(new ApiResponse(200, tweets, "tweets found"));
});
