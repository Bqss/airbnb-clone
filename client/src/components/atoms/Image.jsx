import React from 'react'

const Image = ({src , alt, className, ...d}) => {
  return (
    <div className={'w-full h-full '+ className } {...d} >
      <img className='w-full h-full object-cover'  src={src} alt={alt} />
    </div>
  )
}

export default Image