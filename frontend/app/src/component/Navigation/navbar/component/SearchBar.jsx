import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchChannel } from "../../../../Api/Subscription";
import { useState } from "react";
import { useEffect } from "react";
import debounce from "lodash/debounce";
import { useReducer } from "react";
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
  const location = useLocation();

  useEffect(() => {
    // runs whenever the route changes
    console.log("Navigated to:", location.pathname);

    // if leaving search page, clear input
    if (!location.pathname.startsWith("/search-page")) {
      setpart("");
    }
  }, [location]);

  const handleSearchChannel = async (userdata) => {
    const res = await searchChannel(userdata);
    setchanel(res.data.data);
    if (res.data.data.channel?.length > 0) {
      setchannel(res.data.data?.channel);
    } else {
      setviideo(res.data.data.video);
    }
  };
  const hasMounted = useRef(false);
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
    <div className="relative w-full max-w-xl ">
      {/* Search Input */}
      <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-600 transition">
        <input
          type="text"
          placeholder="Search..."
          className="w-full sm:px-4 sm:py-2.5 p-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm "
          value={part}
          onChange={(e) => {
            debouncedSearchChannel({ value: e.target.value });
            setvalue(true);
            setpart(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value === true && part.trim() !== "") {
              handleSearch();
              setvalue(false);
              setpart("");
            } else {
              setvalue(false);
            }
          }}
        />
      </div>

      {/* Dropdown Results */}
      {value && (
        <div className="absolute top-full mt-2 sm:w-full  bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {merged?.slice(0, 9).map((c, index) => (
            <p
              key={index}
              className="px-4 py-2.5 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 hover:text-blue-600 transition"
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
  );
};
export default SearchBar;
