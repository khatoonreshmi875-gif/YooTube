import { Suspense, useState, lazy } from "react";
import { useVideoPlayer } from "./VideoPlayer";
import useView from "./useView";
const Videojs = lazy(() => import("./Videojs"));

const VidJS = ({ cloudName, videourl, videoFile, userId }) => {
  console.log("page rerender");
  const { handlePlayerReady, videoJsOptions, playerRef } =
    useVideoPlayer(videourl);
  const [playerInstance, setplayerInstance] = useState(null);
  console.log("cloudname videojs", cloudName, videourl, videoFile, userId);
  // useView(playerInstance, videourl); // pass player + publicId}

  useView(playerInstance, videourl, videoFile, userId, cloudName);

  return (
    <div>
      <Suspense
        fallback={
          <div className="flex flex-col">
            {" "}
            <div className="w-full md:h-[30rem] h-48 bg-gray-300 animate-pulse rounded-3xl shadow-lg" />
          </div>
        }
      >
        <Videojs
          options={videoJsOptions}
          onReady={(player) => {
            handlePlayerReady(player);
            //playerInstance.current = player;
            setplayerInstance((prev) => prev || player);

            console.log("on player 🌼", player);
          }}
          videourl={videourl}
        />
      </Suspense>
    </div>
  );
};

export default VidJS;
