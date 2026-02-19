import React from "react";
import { useNavigate } from "react-router-dom";
import { DeleteAccount } from "../../Api/UserApi";
import DropDownItem from "../HomePage.jsx/HomePageComponent/DropDownItem";

const ChannelMenu = ({ open }) => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const res = await DeleteAccount();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 
                     bg-white border border-slate-200 
                     rounded-md shadow-lg z-50"
        >
          <DropDownItem
            label=" Update Account"
            onClick={() => navigate(`/update-account`)}
            bg=" text-slate-700 hover:bg-slate-100 "
          />
          <div className="py-1 flex flex-col text-slate-700">
            <DropDownItem
              label=" Update Avatar"
              onClick={() => navigate(`/update-avatar`)}
              bg=" text-slate-700 hover:bg-slate-100 "
            />{" "}
            <DropDownItem
              label=" Update coverImage"
              onClick={() => navigate(`/update-coverImage`)}
              bg=" text-slate-700 hover:bg-slate-100 "
            />{" "}
            <DropDownItem
              bg=" text-red-500 hover:bg-red-50  "
              label="   Delete"
              onClick={handleDeleteAccount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelMenu;
