import { User } from "../../../models/user.model.js";
import ApiError from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
export const removeModerator = asynchandler(async (req, res) => {
  console.log("ASSIGN MODERATOR HIT");

  const { email } = req.body;
  //console.log(req.body);
  if (!email) {
    throw new ApiError(400, "email is not found");
  }
  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        role: "user",
      },
    },
    { new: true },
  );
  if (!user) {
    throw new ApiError(400, "User  not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Moderator role assigned successfully"));
});
