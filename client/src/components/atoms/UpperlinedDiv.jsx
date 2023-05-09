import React from 'react'

const UpperlinedDiv = ({className, children}) => {
  return (
    <div className={`border-t border-gray-300 my-6 pt-6 ${className}`}>
      {children}
    </div>
  )
}

export default UpperlinedDiv