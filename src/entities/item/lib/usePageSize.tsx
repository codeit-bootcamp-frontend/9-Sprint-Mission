import { useEffect, useState } from "react";

export const SORT_TYPE = { recent: "recent", favorite: "favorite" };

const getPageSize = (sortName: string) => {
  const width = window.innerWidth;
  if (width < 768) {
    return sortName === SORT_TYPE.recent ? 4 : 1;
  } else if (width < 1200) {
    return sortName === SORT_TYPE.recent ? 6 : 2;
  } else {
    return sortName === SORT_TYPE.recent ? 10 : 4;
  }
};

function usePageSize(sort = SORT_TYPE.recent) {
  const [pageSize, setPageSize] = useState(getPageSize(sort));

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
