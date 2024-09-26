import { useEffect, useState } from "react"

export const calculateWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width > 375 && width < 767) {
    return 4;
  } else if (width > 768 && width < 1199) {
    return 8;
  } else {
    return 10;
  }
}
