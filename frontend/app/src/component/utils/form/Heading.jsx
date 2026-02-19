import React from "react";

const Heading = ({ label }) => {
  return (
    <div>
      <h2 className="font-bold md:text-3xl  sm:text-2xl text-lg text-center p-4  font-serif text-slate-700">
        {label}
      </h2>
    </div>
  );
};

export default Heading;
