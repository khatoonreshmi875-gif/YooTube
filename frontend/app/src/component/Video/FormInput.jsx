import React from "react";

const FormInput = ({
  label,
  name,
  placeholder,
  rules,
  error,
  register,
 
}) => {
  return (
    <>
      <div className="">
        <label
          htmlFor={name}
          className="block sm:text-lg text-sm font-serif text-gray-600 mb-2  pr-1"
        >
          {label} :
        </label>
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          className="w-full 
    border border-gray-300 rounded-lg 
    py-2 px-3 
    text-gray-700 
    focus:ring-2 focus:ring-blue-500 focus:outline-none 
    text-xs sm:text-sm md:text-base lg:text-lg 
    font-serif
 "
          {...register(name, rules)}
        />
        {error && (
          <p role="alert" className="text-red-500 font-serif text-sm ">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default FormInput;
