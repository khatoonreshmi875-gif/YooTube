import React, { useContext, useState } from "react";
import { AppContext } from "../../../utils/contextApi";
import { searchChannel } from "../../../../Api/Subscription";

const SubscriptionSearch = ({ setSelectedChannelId,channel ,handleSearchChannel}) => {
  const [value, setvalue] = useState(false);
  const { followers } = useContext(AppContext);
  const [part, setpart] = useState(null);


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
