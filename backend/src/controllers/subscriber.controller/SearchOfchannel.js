import { User } from "../../models/user.model.js";
import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const SearchOfchannel = asynchandler(async (req, res) => {
  const { value } = req.body;

  let channel = [];
  let video = [];

  if (value) {
    // First try regex search
    channel = await User.find({
      channelName: { $regex: value, $options: "i" },
    }).select(
      "channelName avatar createdAt _id role email subscriberCount subscribedTo",
    );

    video = await Video.find({
      title: { $regex: value, $options: "i" },
    })
      .select("title publicId thumbnail description createdAt views")
      .populate({ path: "owner", select: "channelName avatar _id" });

    // If regex finds nothing, fall back to Atlas Search
    if (video.length === 0) {
      video = await Video.aggregate([
        {
          $search: {
            index: "title_autocomplete",
            autocomplete: {
              query: value,
              path: "title",
              fuzzy: { maxEdits: 2 },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerDetails",
          },
        },
        {
          $unwind: {
            path: "$ownerDetails",
          },
        },
        { $limit: 20 },
        {
          $project: {
            title: 1,
            publicId: 1,
            thumbnail: 1,
            description: 1,
            duration: 1,
            createdAt: 1,
            views: 1,
            ownerDetails: 1,
            owner: {
              channelName: "$ownerDetails.channelName",
              _id: "$ownerDetails._id",
              avatar: "$ownerDetails.avatar",
            },
          },
        },
      ]);
    }
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { channel, video }, "channels fetched successfully"),
    );
});
