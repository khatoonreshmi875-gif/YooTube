import React from "react";
 import { getDB } from "../../../../../../src/utils/indexdb";
const DownloadButton = ({ video }) => {
  const handleDownload = async () => {
    // Fetch video file from server
    const response = await fetch(video.videoFile);
    const blob = await response.blob();

    // Save blob in IndexedDB
    const db = await getDB();
    await db.put("files", blob, video._id);

    // Save metadata in localStorage for listing
    let downloads = JSON.parse(localStorage.getItem("downloads")) || [];
    downloads.push({
      _id: video._id,
      title: video.title,
      thumbnail: video.thumbnail,
      videoFile: video.videoFile,
      view: video.view,
      createdAt: video.createdAt,
      owner: {
        avatar: video.owner.avatar,
        channelName: video.owner.channelName,
      },
    });
    localStorage.setItem("downloads", JSON.stringify(downloads));

    alert("Video saved for offline playback!");
  };

  return (
    <div>
      <button onClick={handleDownload}>Download</button>;
    </div>
  );
};

export default DownloadButton;
