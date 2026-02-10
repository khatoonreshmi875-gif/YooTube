import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import { Video } from "../../models/video.model.js";
import asynchandler from "../../utils/asynchandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getRecommendedVideo = asynchandler(async (req, res) => {
  const { page = 0 } = req.query;
  const userId = req?.user?._id;

  if (!userId) {
    return res.status(400).json(new ApiResponse(400, [], "User ID not found"));
  }
  const Pages = parseInt(page);
  const [userAgg, popularVideos] = await Promise.all([
    User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "videos",
          foreignField: "_id",
          localField: "watchHistory.videoId",
          as: "watchHistoryVideo",
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "watchHistoryVideo.owner",
          as: "owners",
        },
      },
      {
        $unwind: {
          path: "$owners",
        },
      },

      {
        $project: {
          watchHistory: 1,
          "watchHistoryVideo.title": 1,
          "watchHistoryVideo.category": 1,
          "watchHistoryVideo.tags": 1,
          "watchHistoryVideo.createdAt": 1,
          "watchHistoryVideo.owner": 1,
          "watchHistoryVideo._id": 1,
          owner: {
            channelName: "$owners.channelName",
            avatar: "$owners.avatar",
            _id: "$owner._id",
          },
        },
      },
    ]),
    Video.aggregate([
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "owner",
          as: "owners",
        },
      },

      {
        $group: {
          _id: "$_id",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      {
        $sort: {
          views: -1,
          createdAt: -1,
        },
      },
      {
        $skip: Pages * 6,
      },
      {
        $limit: 6,
      },
      {
        $unwind: {
          path: "$owners",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          views: 1,
          createdAt: 1,
          thumbnail: 1,
          publicId: 1,
          videoFile: 1,
          owner: {
            channelName: "$owners.channelName",
            avatar: "$owners.avatar",
            _id: "$owners._id",
          },
        },
      },
    ]),
  ]);

  const user = userAgg[0];

  if (!user || !user.watchHistory || user.watchHistory.length === 0) {
    if (popularVideos.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "no more video"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, popularVideos, "Recommended videos fetched"));
  }

  const watchIds = (user.watchHistoryVideo || []).map((m) => m._id);

  const watchHistoryWithTime = user.watchHistoryVideo.map((video) => ({
    ...video,
    watchedAt: user.watchHistory.find(
      (h) => h?.videoId?.toString() === video?._id?.toString(),
    )?.watchedAt,
  }));

  const now = Date.now();
  const range = [24, 24 * 7, 24 * 30].map((h) => now - h * 60 * 60 * 1000);
  let userhistory = [];
  for (const ran of range) {
    userhistory = watchHistoryWithTime.filter(
      (m) => m?.watchedAt && new Date(m.watchedAt).getTime() >= ran,
    );
    if (userhistory.length) break;
  }

  if (userhistory.length < 7) {
    return res
      .status(200)
      .json(new ApiResponse(200, popularVideos, "Recommended videos fetched"));
  }

  const orCondition = userhistory.flatMap((vid) => [
    { category: vid.category },
    { tags: { $in: vid.tags } },
    { owner: vid.owner },
  ]);

  const recommendedVideos = await Video.aggregate([
    {
      $match: {
        _id: { $nin: watchIds },
        $or: orCondition,
      },
    },
    {
      $group: {
        _id: "$_id",
        doc: {
          $first: "$$ROOT",
        },
      },
    },
    { $replaceRoot: { newRoot: "$doc" } },
    {
      $sort: {
        views: -1,
        createdAt: -1,
      },
    },
    { $skip: Pages * 6 },
    {
      $limit: 6,
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "owner",
        as: "owners",
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        views: 1,
        createdAt: 1,
        thumbnail: 1,
        publicId: 1,

        owner: {
          channelName: "$owners.channelName",
          avatar: "$owners.avatar",
          _id: "$owners._id",
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, recommendedVideos, "Recommended videos fetched"),
    );
});
