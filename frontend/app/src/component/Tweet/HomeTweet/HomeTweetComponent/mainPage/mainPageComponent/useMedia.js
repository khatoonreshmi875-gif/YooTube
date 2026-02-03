// hooks/useTweetMedia.js
import { useEffect, useRef, useState } from "react";

export const useTweetMedia = (tweet) => {
  const [showVisibleIndex, setShowVisibleIndex] = useState({});
  const videoRef = useRef();
  const ref = useRef([]);

  useEffect(() => {
    if (tweet?._id) {
      setShowVisibleIndex({ [tweet._id]: 0 });
    }
  }, [tweet]);
  const handleAvatar = async (userId) => {
    navigate(`/curr-user/${userId}/video`);
  };
  const merge = (info) => {
    const images = info?.image || []; // already strings
    const video = info?.video?.videoFile; // will be undefined if video is null
    return [...images, video].filter(Boolean);
  };

  const getFileType = (url) => {
    if (typeof url !== "string") return "";
    const type = url.split(".");
    return type[type.length - 1];
  };
  return {
    showVisibleIndex,
    setShowVisibleIndex,
    videoRef,
    ref,
    merge,
    getFileType,
    
  };
};
