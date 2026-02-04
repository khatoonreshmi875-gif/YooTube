import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const getAllUser = asynchandler(async (req, res) => {
  // 1️⃣ Try cache first
  // client.del(`/api/v1/users/curr-user`);
  const user = await User.find()
    .select(" channelName email avatar role subscriberCount subscribedToCount")
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current User Fetched Successfully"));
});
