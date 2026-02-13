import mongoose from "mongoose";
import { Tweet } from "../../models/tweet.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { tweetInvalidate } from "../../utils/tweetInvalidate.js";
export const createTweet = asynchandler(async (req, res) => {
  const { content, videoId } = req.body;
  const Imagefile = req.files?.image || [];

  const ImageLocalPath = Array.isArray(Imagefile)
    ? Imagefile.map((file) => file.path)
    : [];
  const image = ImageLocalPath.length
    ? await Promise.all(
        ImageLocalPath.map((path) => uploadOnCloudinary(path, "tweet")),
      )
    : null;
  const newTweet = await Tweet.create({
    content,
    owner: req.user?._id,
    createdAt: new Date(),
    image: image ? image.map((i) => i?.url || null) : null,
    video:new mongoose.Types.ObjectId(videoId) || null,
  });
  if (!newTweet) {
    throw new ApiError(500, "Failed to create tweet");
  }
  const populatedTweet = await Tweet.findById(newTweet._id).populate("video");
  await tweetInvalidate(newTweet._id, req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(201, populatedTweet, "tweet created successfully"));
});
