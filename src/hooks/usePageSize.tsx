import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const usePageSize = (initialPageSize: number) => {
  const [articleCount, setArticleCount] = useState(initialPageSize);
  const [windowWidth, setWindoWidth] = useState(window.innerWidth);
  const debouncedWidth = useDebounce(windowWidth, 100);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      // 클라이언트 사이드에서만 실행
      setWindoWidth(window.innerWidth);
      // debouncedWidth에 따라 articleCount 업데이트
      if (debouncedWidth >= 1280) {
        setArticleCount(3);
      } else if (debouncedWidth >= 768) {
        setArticleCount(2);
      } else {
        setArticleCount(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debouncedWidth]);

  return articleCount;
};

export default usePageSize;
