import { useEffect, useState } from "react";
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
    <div className="flex bg-gradient-to-tr from-cyan-900 via-black to-cyan-900 justify-between pt-5 pb-2  pr-5  h-24 fixed top-0 left-0 right-0  z-50 ring-[0.5px] ring-blue-200 items-center ">
      {/* <div className=" hidden sm:block ">
        <img src="/public/temp/cock.png" className="h-36 w-36 py-4 px-3 " />
      </div> */}

      <SearchBar />
      <div className="flex items-center space-x-3 sm:space-x-12">
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
  );
};

export default Navbar;
