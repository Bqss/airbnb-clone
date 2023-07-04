import { imageOverlay } from "leaflet";
import { set } from "lodash";
import React, { useEffect } from "react";

const ImageComponent = ({ src, alt="", className="", imageFit="contain",onClick = () =>{}, onLoaded = () => {}, ...d }) => {
  const [loaded, setLoaded] = React.useState(false);
 

  return (
    <div className={' w-full h-full overflow-hidden'} onClick={onClick}>
      <img src={src} onLoad={() => setLoaded(true)} className={'relative w-full h-full '+ className} {...d} alt={alt} style={{objectFit : imageFit}} />
      {!loaded && <div className="bg-gray-300  absolute inset-0"></div>}
    </div> 
  )

};

export default ImageComponent;
