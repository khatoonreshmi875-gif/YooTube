import React from "react";

const StatCard = ({ bg, label, value, textColor }) => {
  return (
    <>
      <div
        className={`${bg} h-[6rem] rounded-xl w-full flex items-center justify-center ${textColor} font-bold text-lg shadow-md flex-1 mx-auto flex-col`}
      >
        {label}: <p className="mx-auto ">{value}</p>
      </div>
    </>
  );
};

export default StatCard;
