import React from "react";

const Card = (data) => {
  return (
    <>
      <section className="w-[130px]">
        <div className="text-center w-auto h-10 mx-2">
          <img src={data.img} alt="" className="w-7 h-7 m-auto mb-2" />
          <p className="">{data.name}</p>
        </div>
      </section>
    </>
  );
};

export default Card;
