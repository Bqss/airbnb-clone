import React from 'react'

const types = {
  "circle": "w-12 h-12 rounded-full",
  "rect": " rounded-full",
}


const Skeleton = ({type = "" , height=0, width=0,  className =""}) => {
  return <div className={`${types[type]} ${className} bg-gray-300 animate-pulse`} 
  style={{width : (width > 0 ? width/4+'rem' : '100%'), height :(height > 0 ? height/4+'rem' : 'unset')}}></div>
}



export default Skeleton