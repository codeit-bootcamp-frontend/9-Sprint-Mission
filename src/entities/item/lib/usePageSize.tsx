import { useEffect, useState } from "react";

// SORT_TYPE의 타입을 명시적으로 지정
export const SORT_TYPE = {
  recent: "recent",
  favorite: "favorite",
} as const;

type SortType = keyof typeof SORT_TYPE; // "recent" | "favorite"

// getPageSize 함수의 리턴 타입을 명시적으로 지정
const getPageSize = (sortName: SortType): number => {
  const width = window.innerWidth;

  if (width < 768) {
    return sortName === SORT_TYPE.recent ? 4 : 1;
  } else if (width < 1200) {
    return sortName === SORT_TYPE.recent ? 6 : 2;
  } else {
    return sortName === SORT_TYPE.recent ? 10 : 4;
  }
};

// usePageSize 훅의 sort 기본값과 타입을 명시적으로 지정
function usePageSize(sort: SortType = SORT_TYPE.recent): number {
  const [pageSize, setPageSize] = useState<number>(getPageSize(sort));

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(sort));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sort]);

  return pageSize;
}

export default usePageSize;
