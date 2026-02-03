import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../utils/contextApi";

const SubscripptionVideo = ({ p, f }) => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="text-white pr-2" key={p._id}>
        <img
          src={p.thumbnail}
          onClick={() => navigate(`/video-rec-page/${p._id}/user/${f._id}`)}
          alt=""
          className=" max-w-32 min-w-0  max-h-20 min-h-0 xs:w-40   xs:h-24 rounded-md hover:opacity-80 cursor-pointer transition"
        />
        <p className="font-light md:text-xs text-[12px] line-clamp-2 mt-1 w-28 xl:w-48   ">
          {p.title}
        </p>
        <p className="font-extralight text-xs text-gray-400 ">
          {FormatTime(p.createdAt)}
        </p>
      </div>
    </>
  );
};

export default SubscripptionVideo;
