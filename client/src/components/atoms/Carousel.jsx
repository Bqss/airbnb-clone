import { Transition } from "@headlessui/react";
import React, { Fragment, createContext, useContext, useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import WithFade from "../../components/templates/WithFade";

const CarouselContext = createContext({
  active: 0,
});

const Carousel = ({ children, total }) => {
  const [active, setActive] = useState(0);
  const [onHover, setOnHover] = useState(false);
  const next = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setActive((active) => (active < 4 ? active + 1 : 0));
  };
  const prev = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setActive((active) => (active > 0 ? active - 1 : 4));
  };
  return (
    <CarouselContext.Provider value={{ active }}>
      <div
        className="relative  rounded-xl overflow-hidden bg-gray-50 "
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div className="h-[20%] absolute top-0 w-full bg-gradient-to-b pointer-events-none from-black/5  z-10 "></div>
        <div className="h-[20%] absolute w-full bg-gradient-to-t bottom-0 pointer-events-none  from-black/5  z-10 "></div>
        <div className="flex flex-col justify-between absolute inset-0 pointer-events-none">
          <div></div>
          <WithFade show={onHover} unmount={false}>
            <div className="flex px-2">
              <WithFade show={active > 0} unmount={false}>
                <button
                  onClick={prev}
                  className=" p-2 transition-transform duration-150 rounded-full pointer-events-auto bg-white hover:bg-white hover:scale-105"
                >
                  <GrPrevious className="w-3 h-3" />
                </button>
              </WithFade>

              <WithFade show={active < total-1} unmount={false}>
                <button
                  onClick={next}
                  className=" p-2 transition-transform duration-150 rounded-full ml-auto   pointer-events-auto bg-white hover:bg-white hover:scale-105"
                >
                  <GrNext className="w-3 h-3" />
                </button>
              </WithFade>
            </div>
          </WithFade>
          <div></div>
        </div>
        <div className="overflow-hidden aspect-square">{children}</div>
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.Panel = ({ children, i }) => {
  const { active } = useContext(CarouselContext);
  return (
    <WithFade show={active == i}>
      <div className="w-full h-full">{children}</div>
    </WithFade>
  );
};

export default Carousel;
