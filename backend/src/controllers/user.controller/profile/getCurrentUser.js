import { User } from "../../../models/user.model.js";
import { Video } from "../../../models/video.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
export const getCurrentUser = asynchandler(async (req, res) => {
  const userId = req.user._id;

  // 1️⃣ Try cache first
  // client.del(`/api/v1/users/curr-user`);
  const user = await User.findById(userId)
    .select(
      "coverImage channelName avatar username email fullName description subscriberCount subscribedToCount role",
    )
    .lean();
  const video = await Video.countDocuments({ owner: user._id });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...user, TotalVideo: video },
        "Current User Fetched Successfully",
      ),
    );
});
