import React from "react";

const FormField = ({
  label,
  register,
  name,
  error,
  rules,
  multiple = false,
  accept,
  watch,
  isVideo = false,
  message = "",
}) => {
  return (
    <>
      {" "}
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        <h2 className=" font-serif text-blue-700 mb-3  text-sm sm:text-lg ">
          {label}
        </h2>
        <div className="flex overflow-x-auto we">
          {watch(name) &&
            Array.from(watch(name)).map((file, index) => (
              <div className="overflow-x-auto" key={index}>
                {" "}
                {isVideo ? (
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="md:h-24 w-72 h-40 md:w-40 mx-auto object-cover md:ml-5 rounded-lg border-2 border-white mb-4"
                  />
                ) : (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)} // use file directly
                    alt=""
                    className="md:h-24 w-72 h-40 md:w-40 mx-auto object-cover md:ml-5 rounded-lg border-2 border-white mb-4"
                  />
                )}
              </div>
            ))}
        </div>

        <div className="flex items-center  ">
          <input
            type="file"
            multiple={multiple}
            accept={accept}
            {...register(name, rules)}
            className=" font-serif flex-1 border border-gray-300 rounded-l-lg p-1 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none w-2/3 text-xs  xs:text-sm sm:text-lg "
          />
          <button
            type="button"
            className="bg-blue-600 text-white sm:py-2 p-2  rounded-r-lg hover:bg-blue-700 transition  text-xs xs:text-sm sm:text-lg "
          >
            Browse
          </button>
        </div>
        {message}
        {error && (
          <p role="alert" className="text-red-500 font-serif text-sm">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default FormField;
