import React, { useState } from "react";

const SortMenu = ({ setSort, Isopen, setIsopen }) => {
 

  return (
    <>
      {Isopen && (
        <div className="bg-white shadow-md rounded-md mx-5 mt-3 p-3 space-y-2">
          <p
            onClick={() => setSort("oldest")}
            className="cursor-pointer hover:text-blue-600 transition text-sm sm:text-base"
          >
            Oldest
          </p>
          <p
            onClick={() => setSort("recent")}
            className="cursor-pointer hover:text-blue-600 transition text-sm sm:text-base"
          >
            Recent
          </p>
          <p
            onClick={() => {
              setSort("titleAsc");
              setIsopen(!Isopen);
            }}
            className="cursor-pointer hover:text-blue-600 transition text-sm sm:text-base"
          >
            Title (A-Z)
          </p>
          <p
            onClick={() => {
              setSort("titleDes");
              setIsopen(!Isopen);
            }}
            className="cursor-pointer hover:text-blue-600 transition text-sm sm:text-base"
          >
            Title (Z-A)
          </p>
        </div>
      )}
    </>
  );
};

export default SortMenu;
