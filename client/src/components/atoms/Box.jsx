import React from 'react'

const Box = ({children, className}) => {
  return (
    <div className={`border border-gray-300 flex p-4 items-center gap-3  rounded-xl ${className}`}>
      {children}
    </div>
  )
}

export default Box