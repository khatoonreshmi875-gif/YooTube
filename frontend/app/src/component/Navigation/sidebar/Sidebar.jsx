import {
  ClockIcon,
  CloudArrowDownIcon,
  HeartIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AppContext } from "../../utils/contextApi.js";

import SidebarItem from "./SidebarItem.jsx";

const Sidebar = () => {
  const { fetchWatchHistory, user } = useContext(AppContext);
  console.log(user);
  return (
    <>
      <div className="w-full h-full ">
        <ul className="   w-full ss:gap-6 text-md  sm:mt-4   z-50 flex ss:flex-col flex-row justify-between">
          <li>
            <SidebarItem itemName="Home" path="/" Icon={HomeIcon} />
          </li>

          <li>
            <SidebarItem
              itemName="Favourite"
              path="/like-video"
              Icon={HeartIcon}
            />
          </li>

          <li>
            <SidebarItem
              itemName="History"
              path="/watch-history"
              Icon={ClockIcon}
              onClick={fetchWatchHistory}
            />
          </li>

          <li>
            <SidebarItem
              itemName="Channel"
              path={user ? `/curr-user/${user?._id}/video` : ""}
              Icon={UserCircleIcon}
            />
          </li>

          <li>
            <SidebarItem
              itemName="Downloads"
              path="/download"
              Icon={CloudArrowDownIcon}
            />
          </li>
          <li>
            <SidebarItem
              itemName="Audience"
              path="/page"
              Icon={UserGroupIcon}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
