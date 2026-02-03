import React from "react";
import { useState } from "react";
import { useRef, useMemo, useEffect } from "react";

export const useVideoPlayer = (publicId) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = useMemo(
    () => ({
      controls: true,
      playbackRates: [0.25, 0.5, 1.0, 1.25, 1.5, 1.75, 2.0],
      responsive: true,
      fluid: true,
      sources: [
        {
          src: `https://res.cloudinary.com/dkkvjewof/video/upload/sp_hd/${publicId}.m3u8`,
          type: "application/x-mpegURL",
        },

        // {
        //   src: fallbackFile, // 👈 served from BE
        //   type: "video/mp4",
        // },
      ],
    }),
    [publicId],
  );
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("error", () => {
      // console.warn("Cloudinary failed, switching to local file...");
      // player.src({ src: fallbackFile, type: "video/mp4" });
      player.play();
    });
  };

  return { handlePlayerReady, videoJsOptions, playerRef };
};
