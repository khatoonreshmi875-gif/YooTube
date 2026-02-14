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
  // const getallvideo = async (page) => {
  //   setLoad(true);
  //   console.log("it runs data ....................", page);
  //   try {
  //     const result3 = await RecommendedVideo(page);
  //     if (result3.data.data.length === 0) {
  //       sethasNomore(true);
  //     } else if (result3.data.data.length !== 0) {
  //       setgetvideo((prev) => [...prev, ...result3.data.data]);
  //     } else {
  //       console.warn("No data returned");
  //     }
  //   } catch (error) {
  //     console.log("error of res", error.response?.data?.message);
  //     throw error;
  //   } finally {
  //     setLoad(false);
  //   }
  // };
  const getallvideo = async (page) => {
    setLoad(true);
    console.log(">>> Calling API for page:", page);
    try {
      const result3 = await RecommendedVideo(page);
      console.log("API returned:", result3.data.data.length, "items");
      if (result3.data.data.length === 0) {
        sethasNomore(true);
        console.log(">>> No more data, stopping");
      } else {
        setgetvideo((prev) => [...prev, ...result3.data.data]);
        console.log(
          ">>> Updated video list length:",
          prev.length + result3.data.data.length,
        );
      }
    } catch (error) {
      console.log("Error fetching videos:", error.response?.data?.message);
    } finally {
      setLoad(false);
      console.log(">>> Load finished");
    }
  };

  useEffect(() => {
    console.log("Initial load triggered");
    getallvideo(0); // fetch first page when component mounts
  }, []);
  const fetchNext = () => {
    if (hasNomore) return;
    setcount((prev) => {
      const newCount = prev + 1;
      getallvideo(newCount);
      return newCount;
    });
  };

  useEffect(() => {
    console.log("add the use effect////////////////////////", hasNomore);
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >= document.body.scrollHeight-50 &&
        !hasNomore
      ) {
        console.log(">>> Scroll trigger fired, count:", count);

        fetchNext();
        console.log("hasNomore", hasNomore);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNomore,count,load]);

  const onHandleVideo = async () => {
    const result3 = await getVideoByUserId();
    console.log("video by user id", result3.data.data.videos);
    setvideo(result3.data.data.videos);
  };

  //get video by userId
  const onHandleVideoUserId = async (userId) => {
    const result3 = await getVideoUserId(userId);
    console.log("video by user id", result3.data.data.videos);
    setvideo(result3.data.data.videos);
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
