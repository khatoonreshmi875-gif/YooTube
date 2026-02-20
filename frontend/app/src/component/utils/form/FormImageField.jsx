import React from "react";


// };
const FormImageField = ({
  label,
  register,
  name,
  error,
  rules,
  alt,
  watch,
  message = "",
  multiple = false,
  accept,
  isMargin = true,
}) => {
  return (
    <div
      className={`h-fit border border-slate-300 rounded-3xl w-full bg-white pb-8 ${isMargin ? "lg:mx-8" : ""} `}
    >
      <div className="w-full h-auto flex flex-col">
        {/* Label */}
        <div className="h-auto px-2 lg:text-base   xs:text-sm text-xs text-slate-700 mb-8 rounded-t-xl bg-slate-200 py-5 ">
          {label}
        </div>

        {/* Preview Images */}
        <div>
          {watch(name) &&
            Array.from(watch(name)).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`${alt}-${index}`}
                className="md:h-24 w-72 h-40 md:w-40 mx-auto object-cover md:ml-5 rounded-lg border border-slate-300 mb-4"
              />
            ))}
        </div>

        {/* Input + Browse Button */}
        <div className="flex">
          <input
            type="file"
            multiple={multiple}
            accept={accept}
            {...register(name, rules)}
            className="border border-slate-300 w-full p-2 rounded-l-lg bg-slate-50 text-slate-700  lg:text-base   xs:text-sm text-xs"
          />
          <button className="bg-blue-100 text-slate-800 p-2 rounded-r-lg lg:text-base   xs:text-sm text-xs hover:bg-blue-200 active:bg-blue-300">
            Browse
          </button>
        </div>
      </div>
      <div className="lg:text-base  md:text-sm  text-xs p-2">
        {" "}
        {message}
        {error && (
          <p role="alert" className="text-red-500  sm:text-sm text-xs">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormImageField;
