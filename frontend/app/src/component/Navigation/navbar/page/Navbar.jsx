import React, { useEffect, useState } from "react";

import AccountMenu from "../component/AccountMenu";
import CreateMenu from "../component/CreateMenu";
import SearchBar from "../component/SearchBar";
const Navbar = () => {
  const [likeVideos, setlikeVideos] = useState(false);
  const [content, setContent] = useState(false);
  useEffect(() => {
    // Prefetch likely next routes
    import("../../../Report/reportAdminPage/page/ReportAdminPage");
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 
                 bg-white border-b border-slate-200 
                 h-16 flex items-center shadow-sm s"
    >
      <div
        className="w-full  mx-auto sm:px-6 
                   flex items-center justify-between"
      >
        {/* Left - Logo */}
        <div className="flex items-center sm:gap-2 gap-0.5 cursor-pointer select-none">
          {/* Logo Icon */}
          <div
            className="sm:w-8 aspect-square sm:rounded-lg  rounded-sm
                          bg-blue-600 
                          flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          {/* Brand Name */}
          <span
            className="sm:text-lg text-xs font-semibold 
                           text-slate-900 tracking-tight"
          >
            Vidora
          </span>
        </div>

        {/* Center - Search */}
        <div className="w-[50%] sm:max-w-xl sm:px-6 mx-3 ">
          <SearchBar />
        </div>

        {/* Right - Menus */}
        <div className="flex items-center sm:gap-6 gap-2">
          <CreateMenu
            setlikeVideos={setlikeVideos}
            setContent={setContent}
            content={content}
          />
          <AccountMenu
            setlikeVideos={setlikeVideos}
            setContent={setContent}
            likeVideos={likeVideos}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
