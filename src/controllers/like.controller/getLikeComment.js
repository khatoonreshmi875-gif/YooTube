import asynchandler from "../../utils/asynchandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Comment } from "../../models/comments.model.js";

export const totalLikeComment = asynchandler(async (req, res) => {
  const { videoId } = req.params;

  const commentsWithLikes = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
        parent: null, // ✅ filter comments by videoId
      },
    },

    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
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
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "parent",
        as: "parentComment",
      },
    },
    {
      $addFields: {
        likeCount: {
          $size: "$likes",
        },
        replyCount: {
          $size: "$parentComment",
        },
      },
    },
    {
      $unwind: {
        path: "$ownerDetails",
      },
    },
    {
      $project: {
        content: 1,
        video: 1,
        owner: 1,
        createdAt: 1,
        updatedAt: 1,
        likeCount: 1,
        replyCount: 1,
        likedBy: {
          $cond: {
            if: { $isArray: "$likes" },
            then: {
              $arrayToObject: {
                $map: {
                  input: "$likes",
                  as: "s",
                  in: {
                    k: { $toString: "$$s.likedBy" },
                    v: true,
                  },
                },
              },
            },
            else: {},
          },
        },
        owner: {
          _id: "$ownerDetails._id",
          name: "$ownerDetails.name", // include only what you need
          username: "$ownerDetails.username",
          avatar: "$ownerDetails.avatar",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, commentsWithLikes, "Comment Like status updated"),
    );
});
