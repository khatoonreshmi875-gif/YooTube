import mongoose, { Schema } from "mongoose";
const tweetSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
      },
    ],
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    tweetLikeCount: {
      type: Number,
      default: 0,
    },
    tweetDislikeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
export const Tweet = mongoose.model("Tweet", tweetSchema);
