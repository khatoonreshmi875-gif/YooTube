import React from "react";

const DropDownItem = ({ label, bg, onClick, Icon }) => {
  return (
    <button
      className={` flex w-full text-left px-3 py-2 sm:text-sm text-xs ${bg}
                      
                       rounded transition`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-lg mr-2" />}
      {label}
    </button>
  );
};

export default DropDownItem;
