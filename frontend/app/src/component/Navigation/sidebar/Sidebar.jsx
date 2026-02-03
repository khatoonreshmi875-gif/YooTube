import { useContext } from "react";
import { AiFillHome, AiOutlineHistory } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { IoCloudDownload } from "react-icons/io5";
import { MdFavorite, MdSubscriptions } from "react-icons/md";
import { GetLikedVideos } from "../../../Api/LikeApi.js";
import { AppContext } from "../../utils/contextApi.js";
import SidebarItem from "./SidebarItem.jsx";
import { FaUserShield } from "react-icons/fa6";

const Sidebar = () => {
  const { fetchWatchHistory, user } = useContext(AppContext);

  return (
    <>
      <div className="w-full h-full ">
        <ul className="   w-full ss:gap-6 text-md  sm:mt-4   z-50 flex ss:flex-col flex-row justify-between">
          <li>
            <SidebarItem itemName="Home" path="/" Icon={AiFillHome} />
          </li>

          <li>
            <SidebarItem
              itemName="Favourite"
              path="/like-video"
              Icon={MdFavorite}
            />
          </li>

          <li>
            <SidebarItem
              itemName="History"
              path="/watch-history"
              Icon={AiOutlineHistory}
              onClick={fetchWatchHistory}
            />
          </li>
          <li>
            <SidebarItem
              itemName="Channel"
              path={`/curr-user/${user?._id}/video`}
              Icon={BsPersonCircle}
            />
          </li>
          <li>
            <SidebarItem
              itemName="Downloads"
              path="/download"
              Icon={IoCloudDownload}
            />
          </li>
          <li>
            <SidebarItem
              itemName="Audience"
              path="/page"
              Icon={MdSubscriptions}
            />
          </li>
         
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
