import { Subscription } from "../../models/subscription.model.js";
import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const totalSubscriberOfAnotherchannel = asynchandler(
  async (req, res) => {
    const { channelId } = req.params;
    const subscribedChannels = await Subscription.find({
      subscriber: channelId,
    }).populate("channel createdAt", "channelName avatar subscriberCount _id");
    const subscriberOfEachChannel = await Promise.all(
      subscribedChannels.map(async (m) => {
        const subscribers = await Subscription.countDocuments({
          channel: m.channel._id,
        });
        const video = await Video.find({ owner: m.channel._id })
          .sort({ createdAt: -1 })
          .limit(3)
          .select("title thumbnail createdAt")
          .lean();
        return {
          ...m.channel.toObject(),
          subscriberCount: subscribers,
          video,
          subscribersCreatedAt: m.createdAt,
        };
      }),
    );
    res.status(200).json(
      new ApiResponse(
        200,
        {
          subscriberOfEachChannel,
        },
        "videos fetched successfully ",
      ),
    );
  },
);
