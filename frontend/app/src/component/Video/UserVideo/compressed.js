import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

// const ffmpeg = new FFmpeg({ log: true });

// export const compressVideo = async (file) => {
//   console.log("✅ FFmpeg core loaded");

//   await ffmpeg.load(); // load FFmpeg core
//   console.log("file", file);

//   // Write input file into FFmpeg's virtual FS
//   await ffmpeg.writeFile("input.mp4", await fetchFile(file));
//   console.log("📂 Input file written to FS");

//   // Run compression command
//   await ffmpeg.exec([
//     "-i",
//     "input.mp4",
//     "-vf",
//     "scale=-1:338,pad=600:338:(ow-iw)/2:(oh-ih)/2",
//     "-b:v",
//     "800k",
//     "output.mp4",
//   ]);
//   console.log("✅ Compression finished");

//   // Read compressed file back
//   const data = await ffmpeg.readFile("output.mp4");
//   const compressedBlob = new Blob([data.buffer], { type: "video/mp4" });

//   // ✅ Check compression size
//   const originalSizeMB = file.size / 1024 / 1024;
//   const compressedSizeMB = compressedBlob.size / 1024 / 1024;
//   const ratio = ((originalSizeMB - compressedSizeMB) / originalSizeMB) * 100;

//   console.log(`Original size: ${originalSizeMB.toFixed(2)} MB`);
//   console.log(`Compressed size: ${compressedSizeMB.toFixed(2)} MB`);
//   console.log(`Compression saved: ${ratio.toFixed(2)}%`);

//   return compressedBlob;
// };
const ffmpeg = new FFmpeg({ log: true });

ffmpeg.on("log", ({ type, message }) => {
  console.log(`[FFmpeg ${type}] ${message}`);
});

export const compressVideo = async (file) => {
  if (!file) {
    console.error("❌ No file provided to compressVideo");
    return null;
  }
  console.log("file details:", file.name, file.type, file.size);
  console.log("▶ Starting compression...");
  try {
    await ffmpeg.load();
    console.log("✅ FFmpeg core loaded");
  } catch (err) {
    console.error("❌ FFmpeg load failed:", err);
  }

  console.log("✅ FFmpeg core loaded");

  console.log("file:", file?.name, file?.type, file?.size);
  await ffmpeg.writeFile("input.mp4", await fetchFile(file));
  console.log("📂 Input file written to FS");

  console.log("⚙️ Running compression...");
  try {
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-vf",
      "scale=-1:338,pad=600:338:(ow-iw)/2:(oh-ih)/2",
      "-b:v",
      "800k",
      "output.mp4",
    ]);
    console.log("✅ Compression finished");
  } catch (err) {
    console.error("❌ FFmpeg exec failed:", err);
  }
  console.log("✅ Compression finished");

  const data = await ffmpeg.readFile("output.mp4");
  return new Blob([data.buffer], { type: "video/mp4" });
};
