import { useContext, useEffect, useState } from "react";
import { getDB } from "../../indexdb";
import Layout from "../../Layout";
import EmotyDownloadSkeleton from "../components/EmotyDownloadSkeleton";
import EmptySkeleton from "../../utils/EmptySkeleton";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../../utils/contextApi";
import { Home } from "../../Home";
import { useNavigate } from "react-router-dom";
const DownloadPage = () => {
  const [downloads, setDownloads] = useState();
  const { user } = useContext(AppContext);
  const navigate=useNavigate()
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

  if (downloads?.length === 0) {
    // data fetched but no videos
    return (
      <div className="bg-white flex  w-full h-full justify-center items-center">
        <EmptySkeleton
          Icon={CloudArrowDownIcon}
          button_msg="  Browse Videos"
          msg="  Start exploring and save your favorite videos here."
          heading_text="  No videos downloaded yet"
          onClick={() => navigate("/")}
          userId={user._id}
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full  mb-24 sm:mb-0">
      <div className=" h-full  ">
        <ul>
          {downloads?.map((v, index) => (
            <div className=" sm:p-3 py-3">
              {" "}
              <li key={v._id}>
                <div className="w-full sm:block hidden">
                  <Layout
                    v={v}
                    index={index}
                    func={() => playOffline(v._id)}
                    isDownload={true}
                    setDownloads={setDownloads}
                  />
                </div>
                <div className="w-full block sm:hidden">
                  <Home v={v} key={v._id} setDownloads={setDownloads} />
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DownloadPage;
