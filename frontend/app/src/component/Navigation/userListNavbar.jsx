import React from "react";
import { NavLink } from "react-router-dom";

const UserListNavbar = () => {
  return (
    <div className="relative">
      <ul
        className="flex justify-between items-center w-full 
                   px-4 py-2 bg-white border-b border-slate-200 
                   text-slate-700 sm:text-base text-sm font-medium"
      >
        <li>
          <NavLink
            to="/all-user"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-100 text-slate-900"
                  : "hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            All-Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/role-moderator"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-100 text-slate-900"
                  : "hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            Moderator
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/role-user"
            className={({ isActive }) =>
              `px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-100 text-slate-900"
                  : "hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserListNavbar;