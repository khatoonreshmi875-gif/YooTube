import { Tweet } from "../../models/tweet.model.js";
import { User } from "../../models/user.model.js";
import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";

export const getSimilarChannel = asynchandler(async (req, res) => {
  const { userId } = req.params;
  const { page = 0 } = req.query;
  const user = await User.findById(userId)
    .select("channelName avatar createdAt subscriberCount subscribedToCount ")
    .skip(Number(page) * 9)
    .limit(9);
  const video = await Video.find({ owner: userId })
    .limit(12)
    .sort({
      views: 1,
    })
    .populate({
      path: "owner",
      select: "avatar channelName _id",
    })
    .skip(Number(page) * 9)
    .limit(9);
  const tweet = await Tweet.find({ owner: userId })
    .populate({
      path: "owner",
      select: "channelName avatar",
    })
    .sort({
      createdAt: 1,
    })
    .limit(6)
    .lean();

  if (video.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: [], video: [], hasNomore: true },
          "Video retrieved successfully",
        ),
      );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { video: [user, ...video], tweet, hasNomore: false },
        "Video retrieved successfully",
      ),
    );
});
