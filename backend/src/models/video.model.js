import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoLikeCount: {
      type: Number,
      default: 0,
    },
    videoDislikeCount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],

    Path: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Action",
        "Adventure",
        "Animation",
        "Art & Design",
        "Business & Finance",
        "Cars & Automobiles",
        "Comedy",
        "DIY & Crafts",
        "Documentary",
        "Drama",
        "Education",
        "Entertainment",
        "Fashion & Beauty",
        "Fitness",
        "Food & Cooking",
        "Gaming",
        "Health",
        "History & Culture",
        "Horror",
        "Kids & Family",
        "Lifestyle",
        "Motivation & Self-Help",
        "Music",
        "Mystery / Thriller",
        "News & Politics",
        "Podcasts & Talk Shows",
        "Reaction",
        "Review (Products, Movies, Tech)",
        "Romance",
        "Sci-Fi",
        "Science & Nature",
        "Short Film",
        "Spirituality & Religion",
        "Sports",
        "Technology",
        "Travel",
        "Tutorial / How-to",
        "Vlog",
      ],
    },
  },
  { timestamps: true },
);
videoSchema.index({ owner: 1 });
videoSchema.index({ category: 1 });
videoSchema.index({ tags: 1 });
videoSchema.index({ title: 1 });
videoSchema.index({ views: 1, createdAt: 1 });

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
