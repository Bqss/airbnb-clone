import React from 'react'

const Button = ({className, children, isLoading = false, disabledWhenLoading = false }) => {
  return (
    <button className={['rounded-md px-4 py-2 hover:bg-gray-100',className].join(" ")} disabled={disabledWhenLoading && isLoading} >
      {children}
    </button>
  )
}

export default Button