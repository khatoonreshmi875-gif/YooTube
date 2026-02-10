import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const getUserByUserRole = asynchandler(async (req, res) => {
  const user = await User.find({ role: "user" })
    .select(
      " channelName avatar  subscriberCount subscribedToCount role email _id",
    )
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User By role Fetched Successfully"));
});
