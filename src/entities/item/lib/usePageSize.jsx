import { useEffect, useState } from "react";

export const SORT_TYPE = { rescent: "recent", favorite: "favorite" };

const getPageSize = (sortName) => {
  const width = window.innerWidth;
  if (width < 768) {
    return sortName === SORT_TYPE.rescent ? 4 : 1;
  } else if (width < 1280) {
    return sortName === SORT_TYPE.rescent ? 6 : 2;
  } else {
    return sortName === SORT_TYPE.rescent ? 10 : 4;
  }
};

export default function usePageSize(sort = SORT_TYPE.rescent) {
  const [pageSize, setPageSize] = useState(getPageSize(sort));

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(sort));
      window.addEventListener("resize", handleResize);
    };

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sort]);

  return pageSize;
}
