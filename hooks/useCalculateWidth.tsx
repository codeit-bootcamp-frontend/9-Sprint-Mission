"use client";

import { useEffect, useState } from "react";

// width 값 반환하는 커스텀 훅
export const useCalculateWidth = (value: string) => {
  const [width, setWidth] = useState<number>(0);
  let result = 0;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } 
  }, []);

  if (width > 0) {
    if (value === "all") {
      if (width > 375 && width < 767) {
        result = 4;
      } else if (width >= 768 && width < 1199) {
        result = 6;
      } else {
        result = 10;
      }
    } else {
      if (width > 375 && width < 767) {
        result = 1;
      } else if (width >= 768 && width < 1199) {
        result = 2;
      } else {
        result = 3;
      }
    }
  } 
  
  return result;
};
