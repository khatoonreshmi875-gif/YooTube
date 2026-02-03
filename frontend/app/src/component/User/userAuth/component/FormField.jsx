import React from "react";

const FormField = ({
  label,
  name,
  type,
  error,
  rules,
  placeholder,
  register,
}) => {
  return (
    <>
      {" "}
      <div className="flex flex-col  m-2 space-y-5">
        <label
          htmlFor={name}
          className="md:text-xl text-sm font-serif text-gray-400  "
        >
          {label} {" : "}
        </label>
        <input
          type={type}
          className={`text-sm py-1 font-serif  md:text-lg ${
            error
              ? "border-red-500 border-2 text-black rounded-lg px-2"
              : "text-black rounded-lg px-3"
          }`}
          id={name}
          placeholder={placeholder}
          {...register(name, rules)}
        />
        {error && (
          <p role="alert" className="text-sm font-serif text-red-800 ">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default FormField;
