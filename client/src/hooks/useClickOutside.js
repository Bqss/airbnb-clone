import React, { useEffect, useRef } from "react";

const useClickOutside = (callback, revert) => {
  const componentRef = useRef();
  const listener = (ev) => {
    ev.stopPropagation();
    if (!revert && componentRef.current && !componentRef.current.contains(ev.target)) {
       callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click",listener);
    return() => {
        document.removeEventListener("click",listener);
    };
  }, [componentRef]);

  return componentRef;
};

export default useClickOutside;
