import React from 'react'
import { useSelector } from 'react-redux';

const GuestOnly = ({children}) => {
  const {value} = useSelector(state => state.user);
  if(value?.id) return null;
  return (
    <>
      {children}
    </>
  )
}

export default GuestOnly