import React, { useEffect, useState } from "react";

const LoadingSpinner = ({ label, isData = false }) => {
  const [dots, setdots] = useState(".");
  useEffect(() => {
    const timeUpdate = setInterval(() => {
      setdots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(timeUpdate);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center  mt-4 space-y-6">
      {/* Spinner */}
      <div
        className={`animate-spin rounded-full ${isData ? "sm:w-14 w-10" : "w-20"} aspect-square border-t-4 border-b-4 border-blue-700 border-solid`}
      ></div>

      {/* Loading Text */}
      <p
        className={`text-blue-300  ${isData ? "text-base" : "text-lg"} font-bold tracking-wide animate-pulse`}
      >
        {label}
        {dots}
      </p>
    </div>
  );
};

export default LoadingSpinner;
