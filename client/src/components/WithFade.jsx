import { Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";

const WithFade = ({show, children, unmount}) => {
  return (
    <Transition
      as={Fragment}
      show={show}
      unmount={unmount}
      enter="transition-all duration-300 "
      leave="transition-all duration-300"
      enterFrom="opacity-0 "
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};

export default WithFade;
