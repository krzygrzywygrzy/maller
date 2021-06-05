import React, { useEffect } from "react";

/**
 * manages to decect if user clicked outside of given object
 * @param ref -> useRef() to element
 * @param execute -> thing to do when clicked outside
 */
const useOutsideClick = (ref: React.MutableRefObject<any>, execute: Function) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        execute();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, execute]);
};

export default useOutsideClick;
