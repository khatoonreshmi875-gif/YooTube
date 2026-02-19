import React from "react";

const Button = ({ onClick, label, bg }) => {
  return (
    <button
      onClick={onClick}
      className={`${bg} hover:text-white  px-3 py-1 rounded-md lg:text-base xs:text-sm text-xs transition-colors duration-200  shadow-sm shadow-slate-600 hover:shadow-black active:shadow-transparent `}
    >
      {label}
    </button>
  );
};

export default Button;
