import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const statsSchema = new Schema(
  {
    y: {
      type: Number,
      required: true,
    },
    x: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true },
);

export const Stats = mongoose.model("Stats", statsSchema);
