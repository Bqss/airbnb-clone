import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Stepper = ({ className, value = 1, onIncrement, onDecrement }) => {
  return (
    <div className={["flex items-center gap-3 ",className].join(" ")}>
      <button className="border-2 transition-colors rounded-full p-2 border-gray-200 hover:border-black" onClick={onIncrement}>
        <AiOutlinePlus className="w-4 h-4" />
      </button>
      <span>{value}</span>
      <button className="border-2 transition-colors rounded-full p-2 border-gray-200 hover:border-black" onClick={onDecrement}>
        <AiOutlineMinus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Stepper;
