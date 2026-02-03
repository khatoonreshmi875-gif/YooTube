import React, { useContext, useRef } from "react";
import Videojs from "./Videojs";
import { useCallback, useState, useEffect } from "react";
import { AppContext } from "../../utils/contextApi";
import { useVideoPlayer } from "./VideoPlayer";
import useView from "./useView";

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
    </div>
  );
};

export default VidJS;
