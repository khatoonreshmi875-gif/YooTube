import { User } from "../../../../models/user.model.js";
import ApiError from "../../../../utils/ApiError.js";
import asynchandler from "../../../../utils/asynchandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";
import { userInvalidate } from "../../../../utils/userInvalidate.js";

export const updatecoverImage = asynchandler(async (req, res) => {
  let coverImage;
  if (req.file) {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
      throw new ApiError(400, "coverImage file is required");
    }

    coverImage = await uploadOnCloudinary(coverImageLocalPath, "cover");

  if (!coverImage.url) {
      throw new ApiError(400, "Error while uploading on coverImage");
    }
  }
  const existedUser = await User.findById(req.user?._id);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage ? coverImage.url : existedUser.coverImage,
      },
    },
    { new: true },
  ).select("coverImage");
  await userInvalidate(req.user._id);
  return res.status(200).json(200, user, "coverImage updated successfully");
});
