import { useEffect, useRef, useState } from "react";
import {
  getVideoByUserId,
  getVideoUserId,
  RecommendedVideo,
} from "../Api/VideoApi";
import { useAxiosErrorHandler } from "../component/utils/erroeHandler";
import useInfiniteScroll from "./useInfiniteScroll";

export const useVideo = () => {
  const [getvideo, setgetvideo] = useState([]);
  const [video, setvideo] = useState(null);

  const [load, setLoad] = useState(false);
  const token = localStorage.getItem("token");
  const hasFetchedFirst = useRef(false);
  const hasNomore = useRef(false);
  const getallvideo = async (page) => {
    setLoad(true);
    try {
      const result3 = await RecommendedVideo(page);

      if (result3.data.data.length === 0) {
        console.log("object it run");
        hasNomore.current = true;
      } else {
        setgetvideo((prev) => [...prev, ...result3.data.data]);
      }
    } catch (error) {
      console.log("err",error)
    } finally {
      setLoad(false);
    }
  };
  
  const {} = useInfiniteScroll({ fn: getallvideo, hasNomore, hasFetchedFirst });

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
    load,
    setLoad,
    onHandleVideo,
    onHandleVideoUserId,
    getallvideo,
    hasFetchedFirst,
    token
  };
};
