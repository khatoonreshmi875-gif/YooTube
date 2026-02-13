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
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block  text-sm sm:text-lg  font-serif text-gray-600 mb-2"
      >
        {label} :
      </label>
      <select
        id={name}
        multiple={multiple}
        onClick={onClick}
        accept={accept}
        size={1}
        className={`${isData ? "w-full" : "w-1/2"}  border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none  text-sm sm:text-lg  `}
        {...register(name, rules)}
        onChange={onChange}
      >
        {data?.map((d, index) => (
          <option value={d?._id} key={index}>
            {isData ? d.title : d}
          </option>
        ))}
      </select>
      {message}
      {error && (
        <p role="alert" className="text-red-500 font-serif text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
