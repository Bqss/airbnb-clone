import React, { memo } from 'react'

const Memoized = ({children}) => {
  return (
    memo(children)
  )
}

export default Memoized