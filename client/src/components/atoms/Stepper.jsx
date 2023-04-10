import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Stepper = ({ className, value = 1, setValue, name }) => {
  return (
    <div className={["flex items-center gap-3 ", className].join(" ")}>
      <button
        disabled={value <= 0}
        onClick={() =>
          setValue((prev) => ({
            ...prev,
            [name]: prev[name] - 1,
          }))
        }
        className="border-2 transition-colors rounded-full p-2 border-gray-200 disabled:cursor-not-allowed hover:border-black"
      >
        <AiOutlineMinus className="w-4 h-4" />
      </button>
      <span>{value}</span>
      <button
        onClick={() =>
          setValue((prev) => ({
            ...prev,
            [name]: prev[name] + 1,
          }))
        }
        className="border-2 transition-colors rounded-full p-2 border-gray-200 disabled:cursor-not-allowed hover:border-black"
      >
        <AiOutlinePlus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Stepper;
