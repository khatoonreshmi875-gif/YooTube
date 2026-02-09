import React from "react";

const UpdateFormThumbnail = ({
  label,
  preview,
  data,
  register,
  onChange,
  name,
  rules,
  error,
  message=""
}) => {
  return (
    <>
      {" "}
      <div className="mb-6 border-2 border-gray-300 rounded-lg p-4 mt-3">
        <div className="sm:text-lg font-medium  text-gray-700 mb-4 font-serif text-sm ">{label}</div>
        {data && (
          <img
            src={preview}
            alt="Current thumbnail"
            className="lg:w-32 lg:h-32 object-fill rounded-md mb-4 border w-full max-h-48  "
          />
        )}

        <div className="flex items-center">
          <input
            type="file"
            {...register(name, rules)}
            className="border-2 border-gray-300 sm:p-1 md:p-2 p-1 rounded-l-md w-full bg-blue-50 md:text-base text-xs sm:text-sm  "
            onChange={onChange}
          />
          <button
            type="button"
            className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 md:text-base text-xs md:py-3 sm:text-sm "
          >
            Browse
          </button>
        </div>
        {message}
        {error && (
          <p role="alert" className="text-red-500 font-serif text-sm ">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default UpdateFormThumbnail;
