import React from 'react'

const Button = ({className, disabled, children, isLoading = false,onClick,  disabledWhenLoading = false ,...d}) => {
  return (
    <button className={[' px-4 py-2   disabled:cursor-not-allowed ',className].join(" ")} disabled={disabledWhenLoading && isLoading || disabled} onClick={onClick} {...d}>
      {children}
    </button>
  )
}

export default Button