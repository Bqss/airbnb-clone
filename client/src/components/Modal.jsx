import React, { createContext, useCallback, useContext } from "react";
import { Transition } from "@headlessui/react";
import useClickOutside from "../hooks/useClickOutside";

const ModalContext = createContext({
  isOpen: false,
  onClose: () => {},
});

const Modal = ({ children, className, isOpen, onClose, transition={} }) => {
  return (
    <ModalContext.Provider value={{ onClose }}>
      <Transition show={isOpen}>
        <Transition.Child>
          <div className="absolute inset-0 backdrop-brightness-75 z-10"></div>
        </Transition.Child>
        <Transition.Child  {...transition}>
          <div
            className={[
              "absolute inset-0 z-10 flex justify-center items-center bg-transparent",
              className,
            ].join(" ")}
          >
            {children}
          </div>
        </Transition.Child>
      </Transition>
    </ModalContext.Provider>
  );
};




Modal.Body = ({ className, children }) => {
  const {onClose} = useContext(ModalContext); 
  const modalRef = useClickOutside(onClose);
  return (
    <div className={className} ref={modalRef}>
      {children}
    </div>
  );
};

Modal.Head = () => {};

export default Modal;

