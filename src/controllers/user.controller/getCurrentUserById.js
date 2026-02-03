import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const getCurrentUserById = asynchandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current User Fetched Successfully"));
});
