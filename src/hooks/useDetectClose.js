import { useEffect, useState } from "react";

const useDetectClose = (elem, initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const handleClick = (e) => {
      if (elem.current !== null && !elem.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }

      if (isOpen) {
        window.addEventListener("click", handleClick);
      }

      return () => {
        window.removeEventListener("click", handleClick);
      };
    };
  }, [isOpen, elem]);
  return [isOpen, setIsOpen];
};

export default useDetectClose;
