import React, { useContext, useEffect, useRef } from "react";
import videojs from "video.js";
import "videojs-contrib-quality-levels";

import "videojs-http-source-selector";
import "video.js/dist/video-js.css";
import { useVideoPlayer } from "./VideoPlayer";
const Videojs = ({ videourl, onReady }) => {
  const { handlePlayerReady, videoJsOptions, playerRef, className } =
    useVideoPlayer(videourl);
  const videoRef = useRef(null);
  const playRef = useRef(null);

  useEffect(() => {
    if (!playRef.current) {
      // Create video element inside React container
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");

      videoRef.current.appendChild(videoElement);

      const player = (playRef.current = videojs(
        videoElement,
        videoJsOptions,
        () => {
          //console.log("player is ready");
          if (onReady) {
            onReady(player);
          }
        }
      ));

      // Quality selector setup
      player.ready(() => {
        if (typeof player.httpSourceSelector === "function") {
          player.httpSourceSelector({ default: "auto" });
        }
      });
    } else {
      // Update existing player if options change
      const player = playRef.current;
      player.updateOptions(videoJsOptions);
    }

    return () => {
      if (playRef.current) {
        playRef.current.dispose();
        playRef.current = null;
      }
    };
  }, [videourl]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default Videojs;
