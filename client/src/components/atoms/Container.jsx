import React from 'react'

const sizes = {
  xl : "max-w-[1980px] ",
  lg : "max-w-7xl",
  md : "max-w-6xl",
  sm : "max-w-5xl", 
}

const Container = ({children, className="", size = "xl"}) => {
  return (
    <div className={`w-11/12 ${sizes[size]} mx-auto  ${className}`}>
      {children}
    </div>
  )
}

export default Container