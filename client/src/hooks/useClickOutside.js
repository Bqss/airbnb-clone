import React, { useEffect, useRef } from "react";

const useClickOutside = ( callback) => {
  const componentRef = useRef()
  useEffect(() => {
    window.addEventListener("click", (ev) => {
      if (!componentRef.current.contains(ev.target)) {
        callback();
      }
    });
  }, [componentRef]);

  return componentRef;
};

export default useClickOutside;
