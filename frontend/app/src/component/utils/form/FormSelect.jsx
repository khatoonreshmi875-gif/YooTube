import React from "react";

const FormSelect = ({
  name,
  label,
  register,
  rules,
  data,
  error,
  multiple = false,
  onChange,
  onClick,
  accept,
  isData = false,
  message = "",
  msg = "",
}) => {
  return (
    <div className="relative px-2">
      <label
        htmlFor={name}
        className="block lg:text-base   xs:text-sm text-xs  text-gray-600 mb-2"
      >
        {label} :
      </label>
      <select
        id={name}
        multiple={multiple}
        onClick={onClick}
        accept={accept}
        size={1}
        className={`${isData ? "w-full" : "w-1/2"}  border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none  lg:text-base   xs:text-sm text-xs `}
        {...register(name, rules)}
        onChange={onChange}
      >
        {data?.map((d, index) => (
          <option value={d?._id} key={index}>
            {isData ? d.title : d}
          </option>
        ))}
      </select>
      <div className="sm:text-sm  text-xs p-2">
        {data?.length === 0 && msg}
        {message}
        {error && (
          <p role="alert" className="text-red-500  ">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
