import React from "react";
import Carousel from "../atoms/Carousel";
import { Link } from "react-router-dom";

const AvenueCard = ({ data }) => {
  return (
    <Link className="block relative overflow-hidden rounded-lg " to={`/${data.judul}`}>
      <Carousel total={data.foto.length}>
        {data.foto.map((foto, i) => (
          <Carousel.Panel i={i} key={i}>
            <img
              className="w-full h-full object-scale-down"
              src={foto.url}
              alt={foto.name}
              key={i}
            />
          </Carousel.Panel>
        ))}
      </Carousel>
      <div className="flex flex-col gap-[.5] pt-4 px-1">
        <span className=" font-medium">
          {`${data.alamat.state}, ${data.alamat.name}`}
        </span>
        <span className="text-gray-400">Berjarak ... km</span>
        <span className="text-gray-400">{`Rp.${data.harga}/ malam`}</span>
      </div>
      
    </Link>
  );
};

export default AvenueCard;
