import { Video } from "../../models/video.model.js";
import asynchandler from "../../utils/asynchandler.js";

export const downloadVideo = asynchandler(async (req, res) => {
  try {
    const { videoId } = req.params;

    // Find video in DB
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    console.log(
      "data of vidoe filepath........................................",
      video.filePath,
    );
    // Absolute path to file
    const filePath = path.resolve(video.filePath);

    // Tell browser: "Download this file with this name"
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${video.title || "video"}.mp4"`,
    );
    res.setHeader("Content-Type", "video/mp4");

    // Send file
    res.sendFile(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error downloading video" });
  }
});
