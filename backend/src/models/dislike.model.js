import mongoose, { Schema } from "mongoose";
const dislikesSchema = new Schema(
  {
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    dislikedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  { timestamps: true },
);
dislikesSchema.index({ comment: 1, likedBy: 1 });
export const Dislike = mongoose.model("Dislike", dislikesSchema);
