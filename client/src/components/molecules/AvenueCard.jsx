import React from "react";
import Carousel from "../atoms/Carousel";
import { Link } from "react-router-dom";

const AvenueCard = ({ data }) => {
  return (
    <div className="">
      <Carousel total={data.foto.length}>
        {data.foto.map((foto, i) => (
          <Carousel.Panel i={i}>
            <Link>
              <img
                className="w-full h-full object-scale-down"
                src={foto.url}
                alt={foto.name}
                key={i}
              />
            </Link>
          </Carousel.Panel>
        ))}
      </Carousel>
      <div>
        <span>{data.judul}</span>
      </div>
    </div>
  );
};

export default AvenueCard;
