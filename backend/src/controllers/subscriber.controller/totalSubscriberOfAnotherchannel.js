import { Subscription } from "../../models/subscription.model.js";
import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const totalSubscriberOfAnotherchannel = asynchandler(
  async (req, res) => {
    const { channelId } = req.params;
    if (!channelId) {
      console.log("no channel id is found");
    }
    console.log("its channel id", channelId);
    const subscribedChannels = await Subscription.find({
      subscriber: channelId,
    }).populate("channel", "channelName avatar subscriberCount _id");
    console.log("all subscribed channel", subscribedChannels);
    const subscriberOfEachChannel = await Promise.all(
      subscribedChannels.map(async (m) => {
        const subscribers = await Subscription.countDocuments({
          channel: m.channel._id,
        });
        console.log(channelId, subscribers, m.channel);
        const video = await Video.find({ owner: m.channel._id })
          .sort({ createdAt: -1 })
          .limit(3)
          .select("title thumbnail createdAt")
          .lean();
        console.log("channel", video, m.createdAt, m.channel, m.createdAt);
        console.log("Returning object:", {
          ...m.channel.toObject(),
          subscriberCount: subscribers,
          video,
          subscribersCreatedAt: m.createdAt,
        });
        const result = {
          ...m.channel.toObject(),
          subscriberCount: subscribers,
          video,
          subscribersCreatedAt: m.createdAt,
        };

        console.log("Returning object:", result);
        return result;
      }),
    );
    console.log("filtered", subscriberOfEachChannel);
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
