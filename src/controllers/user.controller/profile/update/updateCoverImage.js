import { User } from "../../../../models/user.model.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import asynchandler from "../../../../utils/asynchandler.js";
import { uploadOnCloudinary } from "../../../../utils/cloudinary.js";
import client from "../../../../utils/redis.js";

export const updatecoverImage = asynchandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "coverImage file is required");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading on coverImage");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true },
  ).select("-password");
  await Promise.allSettled([
    client.del(`/api/v1/users/curr-user-by-id/${req.user._id}`),
    client.del(`/api/v1/users/curr-user`),
  ]);
  return res.status(200).json(200, user, "coverImage updated successfully");
});
