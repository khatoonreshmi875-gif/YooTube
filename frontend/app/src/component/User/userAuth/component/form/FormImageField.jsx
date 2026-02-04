import React from "react";

const FormImageField = ({
  label,
  register,
  name,
  error,
  rules,
  alt,
  watch,
  multiple = false,
  accept,
 
}) => {
  return (
    <>
      {" "}
      <div className="h-fit  border-black border-2 rounded-3xl w-full bg-gradient-to-br from-cyan-800  via-slate-600 to-cyan-950 pb-8 lg:mx-8 ">
        <div className=" w-full h-auto  flex flex-col ">
          <div className="h-auto  px-2  w-[566px]:text-sm md:text-lg color-black/20 mb-[2rem] rounded-t-[1rem] bg-gradient-to-l from-black via-slate-800 to-cyan-950 text-gray-300 py-5 font-serif  ">
            {label}
          </div>
          {/* input box */}
          <div>
            {watch(name) &&
              Array.from(watch(name)).map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)} // use file directly
                  alt={`${alt}-${index}`}
                  className="md:h-24 w-72 h-40 md:w-40 mx-auto object-cover md:ml-5 rounded-lg border-2 border-white mb-4"
                />
              ))}
          </div>

          <div className="flex p-0.5 md:p-2  ">
            <input
              type="file"
              multiple={multiple}
              accept={accept}
           
              {...register(name, rules)}
              className="border-black border-2 h-fit w-full p-2 rounded-l-lg bg-gradient-to-l   w-[566px]:text-sm text-[12px] from-black via-slate-800 to-cyan-950 font-serif text-white text-xs md:text-lg"
            />

            <button className="bg-gray-200 p-2 rounded-r-lg lg:text-lg font-serif sm:text:sm text-[10px]">
              browse
            </button>
          </div>
        </div>
        {error && (
          <p role="alert" className="text-red-500 font-serif text-sm">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default FormImageField;
