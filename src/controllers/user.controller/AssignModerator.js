import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const AssignModerator = asynchandler(async (req, res) => {
  const { email } = req.body;
  //console.log(req.body);
  if (!email) {
    throw new ApiError(400, "email is not found");
  }
  const user = await User.findByIdAndUpdate(
    { email },
    {
      $set: {
        role: "moderator",
      },
    },
    { new: true },
  );
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Moderator role assigned successfully"));
});
