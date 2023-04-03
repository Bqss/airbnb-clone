import React from "react";

const Input = ({
  type,
  disabled,
  register,
  rules,
  className,
  label,
  errors,
  name,
  ...d
}) => {
  return (
    <div className="relative transition-all duration-150">
      <input
        type={type}
        disabled={disabled}
        className={[
          ` peer rounded-md px-4 py-2 pt-6  disabled:cursor-not-allowed ${
            errors[name] ? "border-red-500 focus:border-red-500 " : "focus:border-black "
          }`,
          className,
        ].join(" ")}
        id={name}
        name={name}
        placeholder=" "
        {...register(name, rules)}
        {...d}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm origin-[0] cursor-text left-4 top-1/2  duration-300 -translate-y-full  scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  peer-focus:scale-75  peer-focus:-translate-y-full ${
          errors[name] ? "text-red-600" : " text-black"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
