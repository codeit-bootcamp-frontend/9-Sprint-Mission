import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // 초기 값 설정을 위해 함수 실행
    handleResize();

    console.log("Window size updated:", window.innerWidth, window.innerHeight);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
