import React, { useEffect } from 'react'

const Experimen = ({src=""}) => {
  const [loaded, setLoaded] = React.useState(false);
 

  return (
    <div className='relative'>
      <img src={src} onLoad={() => setLoaded(true)} alt="" />
      {!loaded && <div className="bg-gray-300  absolute inset-0"></div>}
    </div> 
  )
}

export default Experimen