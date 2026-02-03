import React from "react";
import { useNavigate } from "react-router-dom";
import { searchChannel } from "../../../../Api/Subscription";
import { useState } from "react";
import { useEffect } from "react";
import debounce from "lodash/debounce";
const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setvalue] = useState(false);
  const [part, setpart] = useState("");
  const [chanel, setchanel] = useState([]);
  const [viideo, setviideo] = useState([]);
  const [channel, setchannel] = useState([]);
  useEffect(() => {
    setpart("");
    setvalue(false);
  }, []);
  const handleSearchChannel = async (userdata) => {
    const res = await searchChannel(userdata);
    setchanel(res.data.data);
    if (res.data.data.channel?.length > 0) {
      setchannel(res.data.data?.channel);
    } else {
      setviideo(res.data.data.video);
    }
  };
  const debouncedSearchChannel = debounce(handleSearchChannel, 100);
  const channels = Array.isArray(chanel?.channel)
    ? chanel?.channel
    : [chanel?.channel];
  const videos = Array.isArray(chanel?.video) ? chanel?.video : [chanel?.video];
  const merged = [...channels, ...videos].filter(Boolean);

  const formattedQuery = part.replace(/\s+/g, "+").replace(/\|/g, "");
  const handleSearch = () => {
    const data = channel.length > 0 ? "channel" : "title";
    const ID = channel.length > 0 ? channel[0]._id : viideo[0]._id;
    navigate(`/search-page/${ID}/${formattedQuery}/${data}`);
  };
  useEffect(() => {
    setpart("");
    setvalue(false);
  }, []);

  return (
    <>
      {" "}
      <div className="w-full flex justify-center  relative">
        <input
          type="text"
          placeholder="Search"
          className=" h-8 w-[80%] sm:w-11/12 md:w-2/3 rounded-lg mt-2 sm:m-0 mx-2 p-2 relative"
          value={part}
          onChange={(e) => {
            debouncedSearchChannel({ value: e.target.value });
            setvalue(true);
            setpart(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
              setvalue(false);
              setpart("");
            }
          }}
        />
        {value && (
          <div className="bg-white rounded-md absolute top-full mt-2 z-50 w-full sm:w-11/12  space-y-4 md:text-sm text-xs">
            {merged?.slice(0, 9).map((c, index) => (
              <p
                className="hover:bg-gray-200 "
                key={index}
                onClick={() => {
                  setpart(c.channelName || c.title);
                  setvalue(false);
                  if (c._id && c.title) {
                    navigate(`/search-page/${c._id}/${formattedQuery}/title`);
                  } else if (c._id && c.channelName) {
                    navigate(`/search-page/${c._id}/${formattedQuery}/channel`);
                  }
                  hasMounted.current = true;
                }}
              >
                {c.channelName ? `📺 ${c.channelName}` : `🎬 ${c.title}`}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
