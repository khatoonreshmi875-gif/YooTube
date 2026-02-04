import React, { useEffect,useState } from "react";

const FormButton = ({ issubmitting, navigate }) => {
  const [dots, setdots] = useState(".");
  useEffect(() => {
    const timeUpdate = setInterval(() => {
      setdots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(timeUpdate);
  }, [issubmitting]);
  return (
    <>
      {" "}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold plg:px-6 lg:py-2 px-4 py-1 rounded-md shadow-md shadow-gray-700 transition duration-200  text-sm sm:text-base   active:shadow-white "
        >
          {issubmitting ? `Uploading${dots}` : "Upload"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-white hover:bg-blue-50 text-blue-600 font-semibold border border-blue-600 lg:px-6 lg:py-2 px-4 py-1 rounded-md  transition duration-200  text-sm  shadow-gray-700 shadow-md active:shadow-white sm:text-base"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default FormButton;
