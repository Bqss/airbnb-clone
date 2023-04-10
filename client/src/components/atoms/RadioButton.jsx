import React from "react";

const RadioButton = ({ children, className, name, value, setSelected, selected }) => {
  return (
    <label className="block flex-1 cursor-pointer">
      <input type="radio" value={value} checked={selected} onChange={() => setSelected(value)} name={name} className="peer hidden check" />
      <div className={["border-2 transition-colors duration-150 p-5 border-gray-200  rounded-lg  hover:border-black peer-checked:border-black peer-checked:[&>svg]:animate-pop ",className].join(" ")}>
        {children}
      </div>
    </label>
  );
};

export default RadioButton;
