import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
      default: null,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    CommentlikeCount: {
      type: Number,
      default: 0,
    },
    CommentDislikeCount: {
      type: Number,
      default: 0,
    },
    ReplyCount: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true },
);
commentSchema.index({ video: 1 });
commentSchema.index({ parent: 1 });
commentSchema.plugin(mongooseAggregatePaginate);
export const Comment = mongoose.model("Comment", commentSchema);
