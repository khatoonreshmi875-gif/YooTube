import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const getCurrentUser = asynchandler(async (req, res) => {
  const userId = req.user._id;

  // 1️⃣ Try cache first
  // client.del(`/api/v1/users/curr-user`);
  const user = await User.findById(userId)
    .select(
      "coverImage channelName avatar username description subscriberCount subscribedToCount role",
    )
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current User Fetched Successfully"));
});
