import React from "react";
import { NavLink } from "react-router-dom";

const MenuLink = ({ to, label }) => {
  return (
    <>
      <li>
        <NavLink
          to={to}
          className="py-2 hover:bg-gray-200 rounded-sm px-1 active:bg-gray-300 block"
        >
          {label}
        </NavLink>
      </li>
    </>
  );
};

export default MenuLink;
