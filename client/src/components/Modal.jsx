import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
} from "react";
import { Transition } from "@headlessui/react";
import useClickOutside from "../hooks/useClickOutside";

const ModalContext = createContext({
  isOpen: false,
  onClose: () => {},
  closeOnClickOutside : true
});

const Modal = ({ children, className, isOpen,withBackdrop = true, closeOnClickOutside = true, onClose, as, transition }) => {
  return (
    <ModalContext.Provider value={{ onClose, closeOnClickOutside }}>
      <Transition show={isOpen} className="fixed inset-0 z-20 overflow-hidden  bg-transparent">
        {withBackdrop && <Transition.Child
          as={as ||Fragment }
          enter="transition-all  duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all  duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-brightness-[.6] z-10"></div>
        </Transition.Child>}
        <Transition.Child {...transition} as={Fragment}>
          <div
            className={[
              "fixed inset-0 flex  justify-center items-center z-10 ",
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
  const { onClose, closeOnClickOutside } = useContext(ModalContext);
  useEffect(() => {
    if(document.body.scrollHeight > window.innerHeight ){
      document.body.classList.add("mr-[17px]");
    }
    document.body.classList.add(...["overflow-hidden","relative"]);

    return () => {
      document.body.classList.remove(...["overflow-hidden", "mr-[17px]","relative"]);
    };
  }, []);
  const modalRef =  useClickOutside(onClose, !closeOnClickOutside);
  return (
    <div className={className} ref={modalRef}>
      {children}
    </div>
  );
};

Modal.Head = () => {};

export default Modal;
