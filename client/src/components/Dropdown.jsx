import { Transition } from '@headlessui/react';
import React, { Fragment, createContext, useContext, useState } from 'react'
import useClickOutside from "../hooks/useClickOutside";

const DropdownContext = createContext({
  isOpen: false,
  setIsOpen : () => {}
})

const Dropdown = ({className, children}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{isOpen, setIsOpen}}>
      <div className={['relative',className].join(" ")}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

Dropdown.Button = ({children, className}) => {
  const {setIsOpen, isOpen}  = useContext(DropdownContext);
  return (
    <button className={['',className].join(" ")} onClick={() => setIsOpen(!isOpen)}>
      {children}
    </button>
  )
}

Dropdown.Body = ({children, className}) => {
  const {isOpen,setIsOpen} = useContext(DropdownContext);
  const ddRef = useClickOutside(() => setIsOpen(false));
  return (+++
    <Transition show={isOpen} as={Fragment}
      enter='transition-all duration-300'
      leave='transition-all duration-300'
      enterFrom="opacity-0 scale-75"
      enterTo="opacity-100 scale-100"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-75"
    >
      <div className={['absolute right-0 top-12 origin-top-right',className].join(" ")} ref={ddRef}>
        {children}
      </div>
    </Transition>
  )
}

Dropdown.Item = ({className, children, onClick , ...d}) => {
  const {setIsOpen} = useContext(DropdownContext);
  return (
    <button  className={'w-full text-sm bg-white px-4 py-3 text-left hover:bg-gray-100 '+className} onClick={() => {
      onClick();
      setIsOpen(false)
    }} {...d}>
      {children}
    </button>
  )
}

export default Dropdown