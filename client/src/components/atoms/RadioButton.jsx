import React from "react";
import { HiArchiveBox } from "react-icons/hi2";

const RadioButton = ({ children, className, name, value, onSelected }) => {
  return (
    <label className="block flex-1 cursor-pointer">
      <input type="radio" value={value} name={name} className="peer hidden check" />
      <div className={["border-2 transition-colors duration-150 p-5 border-gray-200  rounded-lg  hover:border-black peer-checked:border-black peer-checked:[&>svg]:animate-pop ",className].join(" ")}>
        {children}
      </div>
    </label>
  );
};

export default RadioButton;
