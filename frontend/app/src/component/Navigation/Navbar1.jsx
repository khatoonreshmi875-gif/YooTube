import { NavLink } from "react-router-dom";
const Navbar1 = () => {

  return (
    <div>
      <div className="flex ">
        <ul className="flex justify-between items-center w-full p-2 bg-white text-slate-700 sm:text-base text-[12px] font-medium border-b border-slate-200 shadow-sm ">
          <li>
            <NavLink
              to="video"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100"
                }`
              }
            >
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="playlist-home"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100"
                }`
              }
            >
              Playlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tweet-home"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100"
                }`
              }
            >
              Tweets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="subscription-page"
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100"
                }`
              }
            >
              Subscriptions
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar1;
