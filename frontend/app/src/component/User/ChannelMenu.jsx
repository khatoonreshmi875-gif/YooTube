import React from "react";
import { useNavigate } from "react-router-dom";
import { DeleteAccount } from "../../Api/UserApi";

const ChannelMenu = ({open}) => {
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    const res = await DeleteAccount();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 flex flex-col text-gray-200">
            <button
              onClick={() => navigate(`/update-account`)}
              className="px-4 py-2 text-sm hover:bg-slate-700 text-left"
            >
              Update Account
            </button>
            <button
              onClick={() => navigate(`/update-avatar`)}
              className="px-4 py-2 text-sm hover:bg-slate-700 text-left"
            >
              Update Avatar
            </button>
            <button
              onClick={() => navigate(`/update-coverImage`)}
              className="px-4 py-2 text-sm hover:bg-slate-700 text-left"
            >
              Update Cover Image
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 text-sm hover:bg-red-700 text-left"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelMenu;
