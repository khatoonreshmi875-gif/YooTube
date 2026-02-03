// models/report.model.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Report = mongoose.model("Report", reportSchema);
