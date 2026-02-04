import { User } from "../../../../models/user.model.js";
import { Video } from "../../../../models/video.model.js";
import ApiError from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import asynchandler from "../../../../utils/asynchandler.js";
import { userInvalidate } from "../../../../utils/userInvalidate.js";
export const updateAccountDetails = asynchandler(async (req, res) => {
  const { fullName, channelName, email, description } = req.body;
  if (!(fullName && email)) {
    throw new ApiError(401, "All fields are required");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        description,
        channelName,
      },
    },
    {
      new: true,
    },
  ).select("-password");
  await userInvalidate(req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});
