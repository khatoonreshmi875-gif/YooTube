import React, { useEffect, useState } from "react";

const useInfiniteScroll = ({ fn, hasNomore, hasFetchedFirst, extraArgs }) => {
  const [count, setcount] = useState(0);
  const fetchNext = () => {
    if (hasNomore.current === true) return console.log("it return");
    setcount((prev) => {
      const newCount = prev + 1;
      fn(newCount, extraArgs);
      return newCount;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = () =>
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 50;
      if (
        isNearBottom &&
        hasNomore.current === false &&
        hasFetchedFirst.current === true
      ) {
        fetchNext();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNomore, count, hasFetchedFirst]);

  return {};
};

export default useInfiniteScroll;
