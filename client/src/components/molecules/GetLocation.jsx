import React, { memo, useEffect, useState } from "react";
import SelectLocation from "../atoms/SelectLocation";
import Map from "../atoms/Map";



const GetLocation = ({lokasi, setLokasi}) => {

  const [map, setMap] = useState(null);

  useEffect(() => {
    if(lokasi.name && map) map.setView([lokasi.latitude, lokasi.longitude], map.getZoom());
  },[lokasi]);

  const autoSearch = () => {
    map.locate();
  }

  return (
    <div className=" w-full aspect-square  bg-green-300 mt-4 rounded-lg relative">
      <div className="absolute z-10 inset-x-12 top-8">
        <SelectLocation value={lokasi} setValue={setLokasi} onClear={() => map.setView(center,zoom)} onAutoSearch={autoSearch} />
      </div>
      <Map ref={setMap}  setLokasi={setLokasi} lokasi={lokasi}  />
    </div>
  );
};

export default memo(GetLocation);
