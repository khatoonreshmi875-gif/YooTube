import { NavLink } from "react-router-dom";
const Navbar1 = () => {

  return (
    <div>
      <div className="flex ">
        <ul className="flex justify-between items-center w-full p-1 bg-gradient-to-br from-cyan-700 via-slate-800 to-cyan-900 text-white sm:text-base text-sm ">
          <li>
            <NavLink
              to="video"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="playlist-home"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Playlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tweet-home"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Tweets
            </NavLink>
          </li>
          <li>
            <NavLink to="subscription-page">Subscriptions</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar1;
