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
      <div className={`sm:p-4 p-2 h-[4.3rem]`}>
        <p
          className={`text-slate-700 xs:text-sm text-[12px] ${readMore ? "" : "line-clamp-2"}  `}
          ref={textRef}
        >
          {tweet?.content}
        </p>
        {isClamped && (
          <button
            onClick={() => setReadMore(!readMore)}
            className="text-blue-400 text-xs"
          >
            {readMore ? "read less" : "read more"}
          </button>
        )}
      </div>
    </>
  );
};

export default React.memo(TweetContent);
