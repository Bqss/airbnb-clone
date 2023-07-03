import React from 'react';
import { ClipLoader } from "react-spinners";

const Button = ({className, disabled, children, isLoading ,onClick,  disabledWhenLoading = true ,...d}) => {
  return (
    <button className={[' px-4 py-2   disabled:cursor-not-allowed ',className].join(" ")} disabled={(disabledWhenLoading && isLoading) || disabled} onClick={onClick} {...d}>
      {isLoading ? <ClipLoader size={16} color={"#fff"} /> : children}
    </button>
  )
}

export default Button