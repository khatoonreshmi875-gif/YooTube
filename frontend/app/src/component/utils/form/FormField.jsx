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
    <div className="flex flex-col m-2 space-y-2">
      {/* Label */}
      <label htmlFor={name} className="lg:text-base   xs:text-sm text-xs text-slate-700 ">
        {label} :
      </label>

      {/* Input */}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full rounded-md px-3 py-2 lg:text-base   xs:text-sm text-xs
          border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
          placeholder-slate-400 text-slate-800 transition-colors duration-200
          ${error ? "border-red-500" : "border-slate-300"}`}
      />

      {/* Error Message */}
      {error && (
        <p role="alert" className="text-xs  sm:text-sm  text-red-600 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;

