import { Dislike } from "../../models/dislike.model.js";
import { Like } from "../../models/likes.model.js";
import { User } from "../../models/user.model.js";
import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import client from "../../utils/redis.js";
const getVideoByVideoId = asynchandler(async (req, res) => {
  const { videoId } = req.params;

  const data = await Video.findById(videoId)
    .select(
      " title publicId description views createdAt videoLikeCount videoDislikeCount videoFile",
    )
    .populate({
      path: "owner",
      select: "channelName avatar _id",
    })
    .lean();
  const userId = req.user?._id;
  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      watchHistory: {
        videoId: videoId,
        watchedAt: new Date(),
      },
    },
  });
  const [like, dislike] = await Promise.all([
    Like.exists({
      video: videoId,
      likedBy: req?.user?._id,
    }),
    Dislike.exists({
      video: videoId,
      dislikedBy: req?.user?._id,
    }),
  ]);
  //console.log("like ", like);
  data.isLikedState = Boolean(like);
  data.isDislikedState = !!dislike;
  await client.del(`/api/v1/users/history:${req.user._id}`);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "videos fetched successfully "));
});
export { getVideoByVideoId };
