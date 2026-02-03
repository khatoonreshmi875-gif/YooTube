import { useEffect } from "react";
import { getViews } from "../../../Api/VideoApi";

const useView = (player, publicId, videoFile, userId) => {
  useEffect(() => {
    if (!player || player.isDisposed?.() || typeof player.on !== "function") {
      console.log("❌ player not ready or disposed", player);
      return;
    }

    console.log("✅ useView got player", player);

    const pausedKey = `pausedTime_${publicId}_${userId}`;
    const countKey = `count_${publicId}_${userId}`;

    // restore playback positionv
    let currTime;
    let hasCounted = false;
    let watch = 0;
    let lastUpdate = null;
    player.on("loadedmetadata", () => {
      const savedTime = JSON.parse(localStorage.getItem(pausedKey));
      if (savedTime) {
        try {
          currTime = parseFloat(savedTime.time);
          player.currentTime(currTime);
          watch = parseFloat(savedTime.watchData) || 0;
          console.log("savedTime", parseFloat(savedTime.watchData), watch);
          console.log("⏮ restored time", savedTime.time);
        } catch (err) {
          console.warn("⚠️ failed to restore time", err);
        }
      }
    });

    // save paused time

    const handlePause = () => {
      console.log("pause event fired");
      try {
        if (!player || player.isDisposed() || !player.tech_) return;
        const time = player.currentTime();
        let pausedData = { time: time, watchData: watch };
        localStorage.setItem(pausedKey, JSON.stringify(pausedData));

        lastUpdate = null;
      } catch (err) {
        console.warn("⚠️ pause handler failed", err);
      }
    };

    // reset paused time when ended
    const handleEnded = () => {
      localStorage.setItem(
        pausedKey,
        JSON.stringify({ time: 0, watchData: 0 }),
      );
      hasCounted = false;
      watch = 0;
      lastUpdate = null;
      console.log("🏁 video ended");
    };

    player.on("pause", handlePause);
    player.on("ended", handleEnded);
    player.on("seeking", () => {
      console.log("User started seeking…");
    });
    player.on("seeked", () => {
      console.log("video started...");
      lastUpdate = null;
    });

    // track views after 10s

    const handleTimeUpdate = () => {
      if (!player || player.isDisposed() || hasCounted) return;
      const savedTime = JSON.parse(localStorage.getItem(pausedKey));

      const now = Date.now();
      console.log("now", now);
      console.log("savedTime ✅", savedTime.time);
      console.log(lastUpdate, "lastupdate");
      if (lastUpdate) {
        watch += now - lastUpdate;
      }
      lastUpdate = now;
      let countValue = JSON.parse(localStorage.getItem(countKey));
      const today = new Date().toDateString();
      let fresh = parseFloat(savedTime.time) === 0 || savedTime === null;
      if (!countValue || countValue.date !== today) {
        countValue = { data: 0, date: today };
      }
      console.log("time 🏁", countValue.data);
      console.log("watch", watch, "fresh", fresh);
      if (watch >= 9000 && countValue.data < 4 && fresh) {
        hasCounted = true;
        getViews(videoFile);

        countValue.data += 1;
        localStorage.setItem(countKey, JSON.stringify(countValue));
        console.log("✅ saved countKey", countValue);
      }
    };

    player.on("timeupdate", handleTimeUpdate);

    return () => {
      console.log("🧹 cleaning up useView");
      if (player && typeof player.off === "function") {
        player.off("pause", handlePause);
        player.off("ended", handleEnded);
        player.off("timeupdate", handleTimeUpdate);
      }
    };
  }, [publicId, player]);
};

export default useView;
