import React, { useEffect, useRef, useState } from "react";

const TweetContent = ({ tweet }) => {
  const textRef = useRef(null);
  const [readMore, setReadMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, []);
  return (
    <>
      <div className={`p-4 h-auto`}>
        <p
          className={`text-white font-serif font-thin text-sm ${readMore ? "" : "line-clamp-2"}  `}
          ref={textRef}
        >
          {tweet?.content}
        </p>
        {isClamped && (
          <button onClick={() => setReadMore(!readMore)} className="text-blue-200 text-xs">
            {readMore ? "read less" : "read more"}
          </button>
        )}
      </div>
    </>
  );
};

export default TweetContent;
