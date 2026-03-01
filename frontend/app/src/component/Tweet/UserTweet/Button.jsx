import React from "react";

const Button = ({ onClick, label, bg, disable }) => {
  return (
    <button
      onClick={onClick}
      className={`${bg} hover:text-white  px-3 py-1 rounded-md lg:text-base xs:text-sm text-xs transition-colors duration-200  shadow-sm shadow-slate-600 hover:shadow-black active:shadow-transparent ${disable ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disable}
    >
      {label}
    </button>
  );
};

export default Button;
