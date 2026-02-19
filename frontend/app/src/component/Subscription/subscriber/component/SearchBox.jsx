import { useState } from "react";
import useSubscribers from "./useSubscribers";

const SearchBox = () => {
  const [value, setvalue] = useState(false);
  const [part, setpart] = useState(null);
  const { handleSearchChannel, stats, setSelectedChannelId } = useSubscribers();
  return (
    <div>
      <input
        type="text"
        placeholder=" Search channels..."
        className="w-full  mx-auto block h-12 bg-white border border-slate-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-600 transition text-slate-700 placeholder-slate-400 outline-none text-sm"
        value={part}
        onChange={(e) => {
          handleSearchChannel(e.target.value);
          setvalue(true);
          setpart(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") setvalue(false);
        }}
      />

      {/* Suggestions */}
      <div className="bg-blue-50 text-gray-800 rounded-lg shadow-md mt-2 w-full sm:w-4/5 mx-auto">
        {value &&
          stats?.subscriber?.map((c) => (
            <p
              key={c.userInfo.channelName}
              onClick={() => {
                setpart(c.userInfo.channelName);
                setSelectedChannelId(c.userInfo.channelName);
                setvalue(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-blue-100 transition"
            >
              {c?.userInfo?.channelName}
            </p>
          ))}
      </div>
    </div>
  );
};

export default SearchBox;
