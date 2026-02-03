import React, { useContext, useState } from "react";
import { AppContext } from "../../../utils/contextApi";
import { searchChannel } from "../../../../Api/Subscription";

const SubscriptionSearch = ({ setSelectedChannelId, c }) => {
  const [value, setvalue] = useState(false);
  const { followers } = useContext(AppContext);
  const [part, setpart] = useState(null);

  const [channel, setchannel] = useState(followers);

  <div className="bg-red-50 text-black">
    {value &&
      channel?.map((c) => (
        <p
          onClick={() => {
            setpart(c.channelName);
            setSelectedChannelId(c.channelName);
            setvalue(false);
          }}
        >
          {c.channelName}
        </p>
      ))}
  </div>;
  const handleSearchChannel = async (userdata) => {
    console.log("userdata", userdata);
    const res = await searchChannel(userdata);
    console.log("channel", res);
    setchannel(res.data.data.channel);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="w-4/5  mx-auto my-3 h-10 rounded-lg text-xl p-2"
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

      <div className="bg-red-50 text-black">
        {value &&
          channel?.map((c) => (
            <p
              onClick={() => {
                setpart(c.channelName);
                setSelectedChannelId(c.channelName);
                setvalue(false);
              }}
            >
              {c.channelName}
            </p>
          ))}
      </div>
    </>
  );
};

export default SubscriptionSearch;
