import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../utils/contextApi";
import MenuLink from "./MenuLink";
import { handleAxiosError } from "../../../utils/erroeHandler";
import { logoutUser } from "../../../../Api/UserApi";

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
    <>
      {" "}
      <button
        className="text-white text-3xl relative shadow-md shadow-cyan-900 active:shadow-black"
        onClick={() => {
          setlikeVideos((prev) => !prev);
          setContent(false);
        }}
      >
        <MdAccountCircle />
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
          <MenuLink to="/change-password" label="Change password" />

          <MenuLink to="/register" label=" Register" />
          {user.role === "admin" && (
            <MenuLink to="/assign-moderator" label="Assign Moderator" />
          )}
        </div>
      )}
    </>
  );
};

export default AccountMenu;
