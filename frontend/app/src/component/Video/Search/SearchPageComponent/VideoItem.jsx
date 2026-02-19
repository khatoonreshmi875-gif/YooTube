import { useNavigate } from "react-router-dom";
import Layout from "../../../Layout";
import { Home } from "../../../Home";

const VideoItem = ({ s, index, isDownload }) => {
  const navigate = useNavigate();
  if (s === null) {
    // if null, show fallback
    return <div className="w-full"></div>;
  }

  return (
    <div className="w-full">
      {s.channelName ? (
        <div
          className="flex items-center space-x-6 cursor-pointer hover:bg-slate-800/40 p-4 rounded-xl transition "
          onClick={() => {
            navigate(`/curr-user/${s?._id}/video`);
          }}
        >
          <img
            src={s.avatar}
            alt={`${s.channelName} avatar`}
            className="h-40 w-40 rounded-full border-4 border-cyan-500 shadow-lg object-cover hover:scale-105 transition-transform duration-300"
          />
          <p className="text-white text-2xl font-semibold hover:text-cyan-300 transition-colors">
            {s.channelName}
          </p>
        </div>
      ) : (
        <div>
          <div className="w-full ">
            <div className="w-full sm:block hidden">
              <Layout v={s} key={s._id} isDownload={true} />
            </div>
            <div className="w-full block sm:hidden">
              <Home v={s} key={s._id}  />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoItem;
