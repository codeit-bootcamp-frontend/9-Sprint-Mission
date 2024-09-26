"use client"

import { useEffect, useState } from "react";

export const calculateWidth = (value: string) => {
  const [width, setWidth] = useState(window.innerWidth);
  let result: number = 0;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (value === "all") {
    if (width > 375 && width < 767) {
      result = 4;
    } else if (width >= 768 && width < 1199) {
      result = 8;
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

  return result;
};
