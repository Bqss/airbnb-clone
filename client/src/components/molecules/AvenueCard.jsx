import React from "react";
import { Link } from "react-router-dom";
import {ImageComponent, Carousel} from "/src/components/atoms";

const AvenueCard = ({ data }) => {
  return (
    <Link className="block relative overflow-hidden rounded-lg " to={`/rooms/${data._id}`}>
      <Carousel total={data.foto.length}>
        {data.foto.map((foto, i) => (
          <Carousel.Panel i={i} key={i}>
            <ImageComponent imageFit="cover" src={foto.url} alt={foto.name} key={i}/>
          </Carousel.Panel>
        ))}
      </Carousel>
      <div className="flex flex-col gap-[.5] pt-4 px-1">
        <span className=" font-medium">
          {`${data.alamat.state}, ${data.alamat.name}`}
        </span>
        <span className="text-gray-500">Berjarak ... km</span>
        <span className="text-gray-500">{`Rp.${data.harga}/ malam`}</span>
      </div>
      
    </Link>
  );
};

export default AvenueCard;
