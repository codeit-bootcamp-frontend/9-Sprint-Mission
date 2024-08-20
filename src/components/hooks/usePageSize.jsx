import { useState, useEffect } from 'react';

export const orderByType = {
  favorite: 'favorite',
  recent: 'recent',
};

const getPageSize = orderBy => {
  const width = window.innerWidth;
  if (width < 768) {
    return orderBy === orderByType.favorite ? 1 : 4;
  } else if (width < 1200) {
    return orderBy === orderByType.favorite ? 2 : 6;
  } else {
    return orderBy === orderByType.favorite ? 4 : 10;
  }
};

const usePageSize = page => {
  const [pageSize, setPageSize] = useState(getPageSize(page));

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(page));
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [page]);

  return pageSize;
};

export default usePageSize;
