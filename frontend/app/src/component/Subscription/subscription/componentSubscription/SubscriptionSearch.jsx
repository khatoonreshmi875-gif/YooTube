import { useState } from "react";

const SubscriptionSearch = ({
  setSelectedChannelId,
  channel,
  handleSearchChannel,
}) => {
  const [value, setvalue] = useState(false);
  const [part, setpart] = useState(null);

  return (
    <>
      <div className="relative w-ful flex flex-col items-center">
        {" "}
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
        <div className="bg-white text-center  text-black absolute w-4/5 rounded-lg z-50 font-serif top-14 ">
          {value &&
            channel?.map((c) => (
              <p
                onClick={() => {
                  setpart(c.channelName);
                  setSelectedChannelId(c.channelName);
                  setvalue(false);
                }}
                className=" hover:bg-blue-200 p-2 active:bg-blue-300"
              >
                {c.channelName}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default SubscriptionSearch;
