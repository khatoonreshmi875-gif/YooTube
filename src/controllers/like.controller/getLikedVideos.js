import { Like } from "../../models/likes.model.js";
import asynchandler from "../../utils/asynchandler.js";

import { ApiResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

export const getLikedVideos = asynchandler(async (req, res) => {
  const { sort = "recent" } = req.query;
  const likes = await Like.find({ video: { $exists: true, $ne: null } });
  console.log(likes.map((l) => l.video));
  console.log("userId ⚡", req.user._id);
  const result = [
    {
      $match: {
        video: { $exists: true, $ne: null },
        likedBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $facet: {
        videos: [
          {
            $lookup: {
              from: "videos",
              localField: "video",
              foreignField: "_id",
              as: "Video",
            },
          },

          { $unwind: "$Video" },
          {
            $lookup: {
              from: "users",
              localField: "Video.owner",
              foreignField: "_id",
              as: "Video.owner",
            },
          },
          { $unwind: "$Video.owner" },

          {
            $project: {
              _id: 1,
              likedBy: 1,
              createdAt: 1,
              updatedAt: 1,

              video: {
                _id: "$Video._id",
                title: "$Video.title",
                description: "$Video.description",
                views: "$Video.views",
                thumbnail: "$Video.thumbnail",
                videoFile: "$Video.videoFile",
                createdAt: "$Video.createdAt",
                owner: {
                  _id: "$Video.owner._id",
                  channelName: "$Video.owner.channelName",
                  avatar: "$Video.owner.avatar",
                },
              },
            },
          },
        ],
        count: [
          {
            $count: "totalLike",
          },
        ],
      },
    },
  ];
  if (sort === "recent") {
    result.push({ $sort: { createdAt: -1 } });
  } else if (sort === "oldest") {
    result.push({ $sort: { createdAt: 1 } });
  }

  const response = await Like.aggregate(result);
  return res
    .status(200)
    .json(new ApiResponse(200, response, "Liked videos fetched successfully"));
});
