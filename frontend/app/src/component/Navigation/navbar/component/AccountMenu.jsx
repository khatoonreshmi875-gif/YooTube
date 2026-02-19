import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../Api/UserApi";
import { AppContext } from "../../../utils/contextApi";
import { handleAxiosError } from "../../../utils/erroeHandler";
import MenuLink from "./MenuLink";

const AccountMenu = ({ setContent, setlikeVideos, likeVideos }) => {
  const { setisLoggedin, setgetvideo, user } = useContext(AppContext);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const result = await logoutUser();
      alert(result?.data?.message);
      navigate("/login");
      setisLoggedin(false);
      localStorage.removeItem("token");
      setgetvideo([]);
      navigate(0);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  }

  const token = localStorage.getItem("token");

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => {
          setlikeVideos((prev) => !prev);
          setContent(false);
        }}
        className="flex items-center justify-center 
                 sm:w-9 aspect-square w-5 rounded-full 
                 bg-slate-100 hover:bg-slate-200 
                 transition"
      >
        <UserCircleIcon className="w-6 h-6 text-slate-600" />
      </button>

      {likeVideos && (
        <ul
          className="absolute right-0 mt-2 w-56 
                   bg-white border border-slate-200 
                   rounded-lg shadow-lg text-slate-700
                   py-2 z-50 list-none"
        >
          {/* Logout / Login */}
          <li
            className="w-full text-left px-4 py-2 text-sm 
                   text-slate-700 hover:bg-slate-100 font-normal 
                   hover:text-blue-600 transition cursor-pointer"
          >
            {token ? (
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
            ) : (
              <NavLink to="/login">Log In</NavLink>
            )}
          </li>

          <MenuLink
            to="/change-password"
            label="Change Password"
            onClick={() => setlikeVideos(false)}
          />

          <MenuLink
            to="/register"
            label="Register"
            onClick={() => setlikeVideos(false)}
          />

          {user.role === "admin" && (
            <MenuLink
              to="/assign-moderator"
              label="Assign Moderator"
              onClick={() => setlikeVideos(false)}
            />
          )}

          {(user.role === "admin" || user.role === "moderator") && (
            <>
              <MenuLink
                to="/all-user"
                label="User List"
                onClick={() => setlikeVideos(false)}
              />
              <MenuLink
                to="/report-admin"
                label="Reports"
                onClick={() => setlikeVideos(false)}
              />
            </>
          )}
        </ul>
      )}
    </div>
  );

};

export default AccountMenu;
