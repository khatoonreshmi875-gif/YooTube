import { User } from "../../../models/user.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
export const getUserByModerator = asynchandler(async (req, res) => {
    console.log("it runsss")
  const user = await User.find({ role: "moderator" })
    .select(
      " channelName avatar email subscriberCount subscribedToCount role _id",
    )
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Moderator Fetched Successfully"));
});
