import React from "react";
import Button from "../../../Tweet/UserTweet/Button";

const AddComments = ({ contents, onChange, onClick, setcontents }) => {
  return (
    <div className="flex flex-col w-full justify-center sm:flex-row py-3 sm:space-x-4">
      {/* Input */}
      <input
        type="text"
        placeholder="Add a comment..."
        value={contents}
        onChange={onChange}
        className="sm:flex-1  rounded-md bg-white border border-slate-300 
               shadow-sm px-3 py-2 text-sm text-slate-800 
               placeholder-slate-400 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition-colors duration-200"
      />

      {/* Buttons */}
      <div className="flex xs:flex-row xs:gap-2 justify-between sm:justify-end md:mt-0 xs:w-fit w-full">
        <Button
          label="Comment"
          bg="bg-blue-100 hover:bg-blue-600 text-blue-600"
          onClick={onClick}
        />
        <Button
          label="Cancel"
          bg="bg-slate-200 text-slate-700 hover:bg-slate-400 "
          onClick={() => setcontents("")}
        />

        {/* Cancel button */}
      </div>
    </div>
  );
};

export default AddComments;
