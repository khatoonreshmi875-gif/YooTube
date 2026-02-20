import { User } from "../../../../models/user.model.js";
import ApiError from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import asynchandler from "../../../../utils/asynchandler.js";
export const changeCurrentPassword = asynchandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  //console.log(req.body);
  console.log(
    "Comparing:....................................",
    oldPassword,
    "with stored:",
    newPassword,
  );
  if (!(newPassword === confirmPassword)) {
    throw new ApiError(
      400,
      "Confirm Password is not matched with new password",
    );
  }
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  //console.log("req.user info :", req.user);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Old Password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});
