import React, { useEffect, useState } from "react";
import Button from "../../Tweet/UserTweet/Button";

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
        <Button
          label={issubmitting ? `Uploading${dots}` : "Upload"}
          bg="bg-blue-100 text-blue-600  hover:bg-blue-600"
        />
        <Button
          label="Cancel"
          onClick={() => navigate("/")}
          bg="bg-slate-100 text-slate-600   hover:bg-slate-400 "
        />
      </div>
    </>
  );
};

export default FormButton;
