import {
  UserCircleIcon
} from "@heroicons/react/24/solid";
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
  console.log("user role ", user.role, token);
  return (
    <>
      {" "}
      <button
        className="text-white text-3xl relative shadow-md shadow-cyan-900 active:shadow-black"
        onClick={() => {
          setlikeVideos((prev) => !prev);
          setContent(false);
        }}
      >
        <UserCircleIcon className="w-7 h-7 sm:w-9 sm:h-8"/>
      </button>
      {likeVideos && (
        <div className="right-4 top-20 absolute text-gray-500 bg-white list-none py-4 rounded-xl text-sm px-1 font-serif z-50 ">
          <li className="hover:bg-gray-300  rounded-sm px-1">
            {token ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink to="/login">Log-In</NavLink>
            )}
          </li>
          <MenuLink
            to="/change-password"
            label="Change password"
            onClick={() => setlikeVideos(false)}
          />

          <MenuLink
            to="/register"
            label=" Register"
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
                label="User List "
                onClick={() => setlikeVideos(false)}
              />
              <MenuLink
                to="/report-admin"
                label="Reports"
                onClick={() => setlikeVideos(false)}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AccountMenu;
