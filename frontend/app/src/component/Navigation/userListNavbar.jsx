import React from "react";
import { NavLink } from "react-router-dom";

const UserListNavbar = () => {
  return (
    <div>
      <div className="flex ">
        <ul className="flex justify-between items-center w-full p-1 bg-gradient-to-br from-cyan-700 via-slate-800 to-cyan-900 text-white sm:text-base text-sm ">
          <li>
            <NavLink
              to="/all-user"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              All-Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/role-moderator"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Moderator
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/role-user"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserListNavbar;
