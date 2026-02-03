import React from "react";

const AddComments = ({ contents, onChange, onClick, setcontents }) => {
  return (
    <>
      {" "}
      <div className="flex  flex-col w-full justify-center md:flex-row py-4 md:space-x-4">
        {/* Input */}
        <input
          type="text"
          placeholder="Add a comment..."
          value={contents}
          onChange={onChange}
          className="md:flex-1   rounded-md  bg-slate-950 shadow-sm shadow-blue-100 hover:shadow-black px-1 focus:outline-none focus:ring-2 focus:ring-blue-500 
               placeholder-gray-400 text-sm  text-white p-3"
        />
        <div className="flex sm:flex-row sm:gap-2 justify-between sm:justify-end mt-2 md:mt-0 xs:w-fit w-full ">
          <button
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-700 text-white sm:px-4 sm:py-2 px-3 py-1 rounded-md md:text-sm text-xs  font-medium transition-colors duration-200 disabled:opacity-50 "
            disabled={!contents.trim()}
          >
            Comment
          </button>
          {/* Cancel button */}
          <button
            onClick={() => setcontents("")}
            className="bg-gray-400 hover:bg-gray-500 text-white sm:px-4 sm:py-2 px-3 py-1  rounded-md  md:text-sm text-xs  font-medium transition-colors duration-200 "
          >
            Cancel
          </button>
        </div>
        {/* Comment button */}
      </div>
    </>
  );
};

export default AddComments;
