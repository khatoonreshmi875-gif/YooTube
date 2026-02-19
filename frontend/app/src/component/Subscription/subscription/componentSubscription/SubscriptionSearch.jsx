import { useState } from "react";
import { searchChannel } from "../../../../Api/Subscription";

const SubscriptionSearch = ({ setSelectedChannelId }) => {
  const [channel, setChannel] = useState();
  const [value, setvalue] = useState(false);
  const [part, setpart] = useState(null);
  const handleSearchChannel = async (userdata) => {
    const res = await searchChannel(userdata);
    setChannel(res.data.data.channel);
  };
  return (
    <>
      <div className="relative w-full flex flex-col items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search channels..."
          className="w-4/5 sm:w-3/5 mx-auto my-3 h-10 px-4 py-2.5  text-slate-700 placeholder-slate-400 outline-none text-sm bg-white border border-slate-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-600 transition"
          value={part}
          onChange={(e) => {
            handleSearchChannel({ value: e.target.value });
            setvalue(true);
            setpart(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setvalue(false);
            }
          }}
        />

        {/* Dropdown Results */}
        {value && (
          <div
            className="absolute top-14 w-4/5 sm:w-3/5 bg-white border border-slate-200 
                      rounded-xl shadow-md z-50 font-serif overflow-hidden"
          >
            {channel?.map((c) => (
              <p
                key={c._id}
                onClick={() => {
                  setpart(c.channelName);
                  setSelectedChannelId(c.channelName);
                  setvalue(false);
                }}
                className="px-4 py-2 text-slate-900 hover:bg-cyan-100 active:bg-cyan-200 cursor-pointer transition"
              >
                {c.channelName}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SubscriptionSearch;
