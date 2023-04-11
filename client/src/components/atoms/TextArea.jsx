import React from "react";

const TextArea = ({ name, className, value, setValue, maxLength, row }) => {
  return (
    <div className={["w-full", className].join(" ")}>
      <textarea
        name={name}
        className="w-full resize-none p-3 rounded-xl border border-gray-300"
        maxLength={maxLength}
        value={value}
        rows={row}
        onChange={(ev) => setValue(ev.target.value)}
      ></textarea>
      <div className="mt-2">
        <span className="font-medium text-sm text-gray-500">{`${value.length}/${maxLength}`}</span>
      </div>
    </div>
  );
};

export default TextArea;
