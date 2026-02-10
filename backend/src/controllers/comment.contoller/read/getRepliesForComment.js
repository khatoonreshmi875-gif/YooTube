import mongoose from "mongoose";
import { Comment } from "../../../models/comments.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
export const getReplyComment = asynchandler(async (req, res) => {
  const { commentId } = req.params;
  const { page = 0 } = req.query;
  // async function fetchNestedReplies(commentId) {
  const RepliedComment = await Comment.aggregate([
    {
      $match: { parent: new mongoose.Types.ObjectId(commentId) },
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
        from: "dislikes",
        localField: "_id",
        foreignField: "comment",
        as: "dislikes",
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
      $sort: {
        createdAt: -1,
      },
    },

    {
      $skip: Number(page) * 5,
    },
    {
      $limit: 5,
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
        tweet: 1,
        owner: 1,
        createdAt: 1,
        updatedAt: 1,
        parent: 1,
        CommentlikeCount: 1,
        CommentDislikeCount: 1,
        ReplyCount: 1,
        likedBy: {
          $map: {
            input: "$likes",
            as: "s",
            in: "$$s.likedBy",
          },
        },
        isLikedByCurrentUser: {
          $in: [
            new mongoose.Types.ObjectId(req.user._id),
            {
              $ifNull: [
                {
                  $map: {
                    input: "$likes",
                    as: "like",
                    in: "$$like.likedBy",
                  },
                },
                [], // fallback empty array
              ],
            },
          ],
        },
        isDislikedByCurrentUser: {
          $in: [
            new mongoose.Types.ObjectId(req.user._id),
            {
              $ifNull: [
                {
                  $map: {
                    input: "$dislikes",
                    as: "dislike",
                    in: "$$dislike.dislikedBy",
                  },
                },
                [],
              ],
            },
          ],
        },
        owner: {
          _id: "$ownerDetails._id",
          name: "$ownerDetails.name", // include only what you need
          channelName: "$ownerDetails.channelName",
          avatar: "$ownerDetails.avatar",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, RepliedComment, "Replies fetched successfully"));
});
