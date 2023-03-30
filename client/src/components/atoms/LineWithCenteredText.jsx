import React from "react";

const LineWithCenteredText = ({children, className}) => {
  return (
    <div className={["flex px-6 py-3 gap-2 items-center",className].join(" ")}>
      <hr className=" w-full" />
      <span className="text-sm">{children}</span>
      <hr className=" w-full" />
    </div>
  );
};

export default LineWithCenteredText;
