import React, { useEffect, useRef, useState } from "react";

const TweetContent = ({ tweet, isNested }) => {
  return (
    <>
      <div>
        <p
          className={`sm:p-4 p-2  ${isNested ? "line-clamp-2 h-[4rem]" : "h-fit"}`}
        >
          {tweet?.content}
        </p>
      </div>
    </>
  );
};

export default React.memo(TweetContent);
