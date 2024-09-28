import { useState, useEffect } from "react";
import { ArticleSortOption } from "@/types/article";

const getPageSize = (orderBy: ArticleSortOption): number => {
  if (typeof window === "undefined") return 10;
  const width = window.innerWidth;
  if (width < 768) {
    return orderBy === "like" ? 1 : 10;
  } else if (width < 1280) {
    return orderBy === "like" ? 2 : 10;
  } else {
    return orderBy === "like" ? 3 : 10;
  }
};

const usePageSize = (orderBy: ArticleSortOption): number => {
  const [pageSize, setPageSize] = useState(getPageSize(orderBy));

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(orderBy));
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize, orderBy]);

  return pageSize;
};

export default usePageSize;
