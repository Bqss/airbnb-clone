import { Transition } from "@headlessui/react";
import React, { Fragment, createContext, useContext, useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

const CarouselContext = createContext({
  active: 0,
});

const Carousel = ({ children, total }) => {
  const [active, setActive] = useState(0);
  const [onHover, setOnHover] = useState(false);
  const next = () => {
    setActive((active) => (active < 4 ? active + 1 : 0));
  };
  const prev = () => {
    setActive((active) => (active > 0 ? active - 1 : 4));
  };
  return (
    <CarouselContext.Provider value={{ active }}>
      <div
        className="relative  rounded-xl bg-gray-200 opacity"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div className="flex flex-col justify-between absolute inset-0 pointer-events-none">
          <div></div>
          <Transition
            as={Fragment}
            show={onHover}
            enter="transition-all duration-300 "
            leave="transition-all duration-300"
            enterFrom="opacity-0 "
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex px-2">
              <Transition
                as={Fragment}
                show={active > 0}
                enter="transition-all duration-300 "
                leave="transition-all duration-300"
                enterFrom="opacity-0 "
                enterTo="opacity-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <button
                  onClick={prev}
                  className=" p-3 transition-transform duration-150 rounded-full pointer-events-auto bg-white hover:bg-white hover:scale-105"
                >
                  <GrPrevious className="w-3 h-3" />
                </button>
              </Transition>
              <Transition
                as={Fragment}
                show={active < total - 1}
                enter="transition-all duration-300 "
                leave="transition-all duration-300"
                enterFrom="opacity-0 "
                enterTo="opacity-100"
                leaveFrom="opacity-100"
                leaveTo="opacity"
              >
                <button
                  onClick={next}
                  className=" p-3 transition-transform duration-150 rounded-full ml-auto   pointer-events-auto bg-white hover:bg-white hover:scale-105"
                >
                  <GrNext className="w-3 h-3" />
                </button>
              </Transition>
            </div>
          </Transition>
          <div>

          </div>
        </div>
        <div className="overflow-hidden aspect-square">{children}</div>
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.Panel = ({ children, i }) => {
  const { active } = useContext(CarouselContext);
  return (
    <Transition
      as={Fragment}
      show={active === i}
      enter="transition-all duration-300 "
      leave="transition-all duration-300"
      enterFrom="opacity-0 "
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="w-full h-full">{children}</div>
    </Transition>
  );
};

export default Carousel;
