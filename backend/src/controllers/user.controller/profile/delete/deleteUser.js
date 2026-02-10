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
  await Video.deleteMany({ owner: user._id });
  await Playlist.deleteMany({ owner: user._id });
  await Tweet.deleteMany({ owner: user._id });
  await Like.deleteMany({ owner: user._id });
  await Dislike.deleteMany({ owner: user._id });
  await Comment.deleteMany({ owner: user._id });
  await Subscription.deleteMany({ channel: user._id });
  await Subscription.deleteMany({ subscriber: user._id });

  await user.deleteOne();
  await userInvalidate(user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, [], "delete user accountsuccessfully"));
});
