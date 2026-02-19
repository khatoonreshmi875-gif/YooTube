import React, { useState, useEffect, useRef } from "react";

const useInfiniteScroll = ({
  setLoading,
  similarChannnelvideo,
  similarvideo,

  hasNoVideo,
  id,
  type,
}) => {
  const [count, setCount] = useState(0);
  const fetchNext = () => {
   
    console.log("api run ");
    setLoading(true);
    setCount((prev) => {
      const newCount = prev + 1;
      if (type === "video") {
        similarvideo(id, newCount).finally(() => setLoading(false));
        console.log("similarvideo")
      } else if (type === "channel") {
        console.log("count of similar channel ", newCount);
        similarChannnelvideo(id, newCount).finally(() => setLoading(false));
        console.log("similarchannel");
      }
      return newCount;
    });
  };

  const inCooldown = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        //inCooldownfalse call then true set interval run in 200 it turn false
        if (!inCooldown.current && !hasNoVideo) {
          fetchNext();
          inCooldown.current = true;
          setTimeout(() => {
            inCooldown.current = false;
          }, 100);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return { count };
};

export default useInfiniteScroll;
