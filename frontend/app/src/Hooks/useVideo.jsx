import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getVideoByUserId,
  getVideoUserId,
  RecommendedVideo,
} from "../Api/VideoApi";

export const useVideo = () => {
  const [getvideo, setgetvideo] = useState([]);
  const [video, setvideo] = useState([]);
  const [hasNomore, sethasNomore] = useState(false);
  const [load, setLoad] = useState(false);
  const [count, setcount] = useState(0);
  const getallvideo = async (page) => {
    setLoad(true);
    try {
      const result3 = await RecommendedVideo(page);
      console.log("all video for main page", result3.data.data);

      if (result3.data.data.length === 0) {
        sethasNomore(true);
      } else if (result3.data.data.length !== 0) {
        setgetvideo((prev) => [...prev, ...result3.data.data]);
      } else {
        console.warn("No data returned");
      }
    } catch (error) {
      console.log("error of res", error.response?.data?.message);
      throw error;
    } finally {
      setLoad(false);
    }
  };
  const fetchNext = () => {
    if (hasNomore) return;
    setcount((prev) => {
      const newCount = prev + 1;
      getallvideo(newCount);
      return newCount;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >= document.body.scrollHeight &&
        !hasNomore
      ) {
        fetchNext();
        console.log("hasNomore", hasNomore);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNomore]);

  const onHandleVideo = async () => {
    const result3 = await getVideoByUserId();
    console.log("video by user id", result3.data.data.videos);
    setvideo(result3.data.data);
  };

  //get video by userId
  const onHandleVideoUserId = async (userId) => {
    const result3 = await getVideoUserId(userId);
    console.log("video by user id", result3.data.data.videos);
    setvideo(result3.data.data);
  };
  return {
    getvideo,
    setgetvideo,
    video,
    setvideo,
    hasNomore,
    sethasNomore,
    load,
    setLoad,
    onHandleVideo,
    onHandleVideoUserId,
    getallvideo,
  };
};
