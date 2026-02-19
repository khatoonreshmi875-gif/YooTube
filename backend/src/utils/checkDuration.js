import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";

export const checkDuration = async (filePath) => {
  const info = await ffprobe(filePath, { path: ffprobeStatic.path });
  if (!info || !info.format) {
    console.log("data of cj=heck duratuion",info.streams[0].duration);
    throw new Error("ffprobe failed to read file metadata");
  }

  const duration = parseFloat(info.streams[0].duration);
  return duration;
};
