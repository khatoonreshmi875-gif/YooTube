import { Tweet } from "../../models/tweet.model.js";
import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import asynchandler from "../../utils/asynchandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { deleteFile } from "../../utils/deleteOldFile.js";
import { userInvalidate } from "../../utils/userInvalidate.js";
export const updateUserAvatar = asynchandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }
  const existedUser = await User.findById(req.user?._id);
  if (existedUser?.avatarPublicId) {
    await cloudinary.uploader.destroy(existedUser.avatarPublicId);
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true },
  ).select("-password");
  await deleteFile(avatarLocalPath);
  await userInvalidate(req.user._id);

  return res.status(200).json(200, user, "avatar updated successfully");
});
