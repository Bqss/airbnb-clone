import React from "react";

const Card = (data) => {
  return (
    <>
      <section className="w-[130px] h-16 opacity-75 hover:opacity-100 hover:cursor-pointer per">
        <div className="text-center w-auto mx-2 per-hover:border-b-[1px]">
          <img src={data.img} alt="" className="w-7 h-7 m-auto mb-2" />
          <p className="">{data.name}</p>
        </div>
      </section>
    </>
  );
};

export default Card;
