import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import nlp from "compromise";

export const getSimilarVideo = asynchandler(async (req, res) => {
  const { videoId } = req.params;

  console.log("videoId....", videoId);
  const { page = 0 } = req.query;
  console.log("page number", page);
  const CurrVideo = await Video.findById(videoId);
  const doc = nlp(CurrVideo.title);
  const nouns = doc.nouns().out("array");
  const regexp = nouns.map((n) => `\\b${n}\\b`).join("|");
  const simVideoQuery = [
    { category: CurrVideo.category },
    { tags: { $in: CurrVideo.tags } },
    { owner: CurrVideo.owner },
  ];
  if (regexp) {
    simVideoQuery.push({ title: { $regex: regexp, $options: "i" } });
  }

  const video = await Video.aggregate([
    { $match: { $or: simVideoQuery } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    { $unwind: "$ownerDetails" },
    {
      $addFields: {
        matchScore: {
          $add: [
            { $cond: [{ $eq: ["$category", CurrVideo.category] }, 1, 0] },
            {
              $cond: [
                {
                  $gt: [
                    { $size: { $setIntersection: ["$tags", CurrVideo.tags] } },
                    0,
                  ],
                },
                1,
                0,
              ],
            },
            { $cond: [{ $eq: ["$owner", CurrVideo.owner] }, 1, 0] },
            {
              $cond: [
                {
                  $regexMatch: { input: "$title", regex: regexp, options: "i" },
                },
                1,
                0,
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        videoFile: { $first: "$videoFile" },
        thumbnail: { $first: "$thumbnail" },
        createdAt: { $first: "$createdAt" },
        views: { $first: "$views" },
        videoLikeCount: { $first: "$videoLikeCount" },
        videoDislikeCount: { $first: "$videoDislikeCount" },
        matchScore: { $first: "$matchScore" },
        description: { $first: "$description" },
        ownerDetails: { $first: "$ownerDetails" }, // ✅ collapse whole object
      },
    },
    { $sort: { matchScore: -1 } },
    { $skip: parseInt(page) * 9 },
    { $limit: 9 },
    {
      $project: {
        title: 1,
        videoFile: 1,
        thumbnail: 1,
        createdAt: 1,
        views: 1,
        videoLikeCount: 1,
        videoDislikeCount: 1,
        matchScore: 1,
        description: 1,
        owner: {
          channelName: "$ownerDetails.channelName",
          _id: "$ownerDetails._id",
          avatar: "$ownerDetails.avatar",
        },
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, { video }, "Video retrieved successfully"));
});
