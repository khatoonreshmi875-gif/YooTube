import { useNavigate } from "react-router-dom";
import Layout from "../../../Layout";
import { Home } from "../../../Home";
import { useState } from "react";

const VideoItem = ({ s, index, isDownload }) => {
  const navigate = useNavigate();
  const [disabledUI, setDisabledUI] = useState(false);

  if (s === null) {
    // if null, show fallback
    return <div className="w-full"></div>;
  }
  console.log("data of eact one ", s);
  return (
    <div className="w-full">
      {s.channelName ? (
        <div
          className="flex items-center space-x-6 cursor-pointer bg-white  p-4 rounded-xl transition shadow-sm shadow-gray-200 hover:shadow-md"
          onClick={() => {
            navigate(`/curr-user/${s?._id}/video`);
          }}
        >
          <img
            src={s.avatar}
            alt={`${s.channelName} avatar`}
            className=" sm:w-40 w-28 aspect-square rounded-full border-2 border-blue-200 shadow-lg object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col space-y-5">
            {" "}
            <p className="text-black sm:text-lg text-sm font-semibold  ">
              {s.channelName}
            </p>
            <div className="flex  space-x-6 sm:text-base text-xs">
              {" "}
              <p className="text-black transition-colors">
                {s.subscriberCount} subscriber
              </p>
              <p className="text-black transition-colors">
                {s.subscribedToCount} subscribed
              </p>
            </div>
            <button
              onClick={() => navigate(`/curr-user/${s?._id}/video`)}
              className="hover:text-white  px-3 py-1 rounded-md lg:text-base xs:text-sm text-xs transition-colors duration-200  shadow-sm shadow-slate-600 hover:shadow-black active:shadow-transparent bg-slate-100 text-slate-600 hover:bg-slate-400"
            >
              View Channel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full ">
            <div className="w-full sm:block hidden">
              <Layout v={s} key={s._id} isDownload={true} />
            </div>
            <div className="w-full block sm:hidden">
              <Home
                v={s}
                key={s._id}
                setDisabledUI={setDisabledUI}
                disabledUI={disabledUI}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoItem;
