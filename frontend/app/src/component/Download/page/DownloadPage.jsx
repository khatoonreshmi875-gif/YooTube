import { useEffect, useState } from "react";

import { getDB } from "../../indexdb";
import Layout from "../../Layout";
import EmotyDownloadSkeleton from "../components/EmotyDownloadSkeleton";
const DownloadPage = () => {
  const [downloads, setDownloads] = useState();

  useEffect(() => {
    
    try {
      const saved = JSON.parse(localStorage.getItem("downloads")) || [];
      setDownloads(saved);
    } catch (err) {
      console.error("Failed to parse downloads from localStorage", err);
      setDownloads([]); // fallback
    }
  }, []);

  const playOffline = async (videoId) => {
    const db = await getDB();
    const blob = await db.get("files", videoId);
    if (!blob) {
      alert("Video not downloaded yet!");
      return;
    }
    const url = URL.createObjectURL(blob);
    const videoEl = document.getElementById(videoId);
    videoEl.src = url;
    videoEl.play();
  };
  console.log(downloads);
  return (
    <div className="min-h-screen w-full mt-24 mb-24 sm:mb-0">
      <div className=" h-full  ">
        {downloads?.length === 0 ? (
          <EmotyDownloadSkeleton className="h-full w-full " />
        ) : (
          <ul>
            {downloads?.map((v, index) => (
              <div className=" sm:p-7 py-5">
                {" "}
                <li key={v._id}>
                  <div>
                    <Layout
                      s={v}
                      index={index}
                      func={() => playOffline(v._id)}
                      isDownload={true}
                      setDownloads={setDownloads}
                    />
                  </div>
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;
