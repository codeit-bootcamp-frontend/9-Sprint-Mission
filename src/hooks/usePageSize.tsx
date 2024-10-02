import { useState, useEffect } from "react";

const usePageSize = (initialPageSize: number) => {
  const [articleCount, setArticleCount] = useState(initialPageSize);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth; // 클라이언트 사이드에서만 실행
      if (width >= 1280) {
        setArticleCount(3);
      } else if (width >= 768) {
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
  }, []);

  return articleCount;
};

export default usePageSize;
