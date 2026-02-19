import React from "react";
import EmptySkeleton from "../../utils/EmptySkeleton";

const NoMoreVideoMessage = () => {
  return (
    <>
      {" "}
      <EmptySkeleton
        Icon={MdVideoLibrary}
        msg=" You’ve reached the end of your feed. Check back later for fresh
          content or explore other sections."
        heading_text="  No videos available"
      />
    </>
  );
};

export default NoMoreVideoMessage;
