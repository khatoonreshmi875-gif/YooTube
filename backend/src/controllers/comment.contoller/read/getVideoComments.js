import { Comment } from "../../../models/comments.model.js";
import asynchandler from "../../../utils/asynchandler.js";
import ApiError from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import mongoose from "mongoose";

export const getVideoComments = asynchandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 0 } = req.query;
  if (!videoId) {
    throw new ApiError(401, "videoId is required");
  }

  const comment = await Comment.aggregate([
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
      $graphLookup: {
        from: "comments",
        startWith: "$_id", // start from the current comment
        connectFromField: "_id", // link from comment _id
        connectToField: "parent", // link to replies' parent field
        as: "replies", // output array field
        depthField: "level", // optional: shows nesting depth
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "replies.owner",
        foreignField: "_id",
        as: "replyOwners",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "replies._id",
        foreignField: "comment",
        as: "replyLikes",
      },
    },
    {
      $lookup: {
        from: "dislikes",
        localField: "replies._id",
        foreignField: "comment",
        as: "replyDislikes",
      },
    },

    {
      $unwind: {
        path: "$ownerDetails",
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
      $project: {
        content: 1,
        video: 1,
        owner: 1,
        createdAt: 1,
        updatedAt: 1,
        CommentlikeCount: 1,
        CommentDislikeCount: 1,
        ReplyCount: 1,
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
          username: "$ownerDetails.username",
          avatar: "$ownerDetails.avatar",
          channelName: "$ownerDetails.channelName",
        },
        replies: {
          $slice: [
            {
              $map: {
                input: "$replies",
                as: "m",
                in: {
                  _id: "$$m._id",
                  parent: "$$m.parent",
                  content: "$$m.content",
                  owner: {
                    $let: {
                      vars: {
                        matched: {
                          $filter: {
                            input: "$replyOwners",
                            as: "reply",
                            cond: { $eq: ["$$reply._id", "$$m.owner"] },
                          },
                        },
                      },
                      in: {
                        _id: "$$matched._id",
                        channelName: "$$matched.channelName",
                        avatar: "$$matched.avatar",
                      },
                    },
                  },
                  createdAt: "$$m.createdAt",
                  CommentlikeCount: "$$m.CommentlikeCount",
                  CommentDislikeCount: "$$m.CommentDislikeCount",
                  ReplyCount: "$$m.ReplyCount",
                  isLikedByCurrentUser: {
                    $in: [
                      new mongoose.Types.ObjectId(req.user._id),
                      {
                        $ifNull: [
                          {
                            $map: {
                              input: "$replyLikes",
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
                              input: "$replyDislikes",
                              as: "dislike",
                              in: "$$dislike.dislikedBy",
                            },
                          },
                          [],
                        ],
                      },
                    ],
                  },
                },
              },
            },

            5,
          ],
        },
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comments fetched successfully"));
});
