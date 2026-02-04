import { User } from "../../../models/user.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
export const getUserByModerator = asynchandler(async (req, res) => {
  const user = await User.find({ role: "moderator" })
    .select(
      "coverImage channelName avatar username description subscriberCount subscribedToCount role",
    )
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Moderator Fetched Successfully"));
});
