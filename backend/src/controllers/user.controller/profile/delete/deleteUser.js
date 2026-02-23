import { Comment } from "../../../../models/comments.model.js";
import { Dislike } from "../../../../models/dislike.model.js";
import { Like } from "../../../../models/likes.model.js";
import { Playlist } from "../../../../models/playlists.model.js";
import { Subscription } from "../../../../models/subscription.model.js";
import { Tweet } from "../../../../models/tweet.model.js";
import { User } from "../../../../models/user.model.js";
import { Video } from "../../../../models/video.model.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import asynchandler from "../../../../utils/asynchandler.js";
import { userInvalidate } from "../../../../utils/userInvalidate.js";
export const deleteUser = asynchandler(async (req, res) => {
  const userId = req.params.userId || req.user._id;

  const user = await User.findById(userId);

  const subscriberUser = await Subscription.find({ channel: user._id })
    .select("subscriber")

    .lean();
  const SubscriberId = subscriberUser.map((m) => m.subscriber);
  if (SubscriberId.length > 0) {
    await User.updateMany(
      { _id: { $in: SubscriberId }, subscribedToCount: { $gt: 0 } },

      {
        $inc: {
          subscribedToCount: -1,
        },
      },
    );
  }

  const subscribedUser = await Subscription.find({ subscriber: user._id })
    .select("channel")

    .lean();
  const channelId = subscribedUser.map((m) => m.channel);
  if (channelId.length > 0) {
    await User.updateMany(
      { _id: { $in: channelId }, subscriberCount: { $gt: 0 } },
      {
        $inc: {
          subscriberCount: -1,
        },
      },
    );
  }
  const like = await Like.find({ likedBy: user._id })
    .select("comment video")
    .lean();
  const videoId = like.map((m) => m.video);

  const commentId = like.map((m) => m.comment);
  if (commentId.length > 0) {
    await Comment.updateMany(
      { _id: { $in: commentId }, CommentlikeCount: { $gt: 0 } },
      {
        $inc: {
          CommentlikeCount: -1,
        },
      },
    );
  }
  if (videoId.length > 0) {
    await Video.updateMany(
      { _id: { $in: videoId }, videoLikeCount: { $gt: 0 } },
      {
        $inc: {
          videoLikeCount: -1,
        },
      },
    );
  }
  const dislike = await Dislike.find({ dislikedBy: user._id })
    .select("comment video")
    .lean();
  const DislikeCommentId = dislike.map((m) => m.comment);
  const DislikeVideoId = dislike.map((m) => m.video);
  if (DislikeCommentId.length > 0) {
    await Comment.updateMany(
      { _id: { $in: DislikeCommentId }, CommentDislikeCount: { $gt: 0 } },
      {
        $inc: {
          CommentDislikeCount: -1,
        },
      },
    );
  }
  if (DislikeVideoId.length > 0) {
    await Video.updateMany(
      { _id: { $in: DislikeVideoId }, videoDislikeCount: { $gt: 0 } },
      {
        $inc: {
          videoDislikeCount: -1,
        },
      },
    );
  }
  await Video.deleteMany({ owner: user._id });
  await Playlist.deleteMany({ owner: user._id });
  await Tweet.deleteMany({ owner: user._id });
  await Like.deleteMany({ likedBy: user._id });
  await Dislike.deleteMany({ dislikedBy: user._id });
  await Comment.deleteMany({ owner: user._id });
  await Subscription.deleteMany({ channel: user._id });
  await Subscription.deleteMany({ subscriber: user._id });
  await Report.deleteMany({ reportedBy: user._id });
  await user.deleteOne();
  await userInvalidate(user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, [], "delete user account successfully"));
});
