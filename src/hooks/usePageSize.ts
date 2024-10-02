import { useState, useEffect } from 'react';

const usePageSize = () => {
  const [pageSize, setPageSize] = useState(3); // 기본값을 데스크탑 크기로 설정

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < 640) {
        setPageSize(1); // 모바일
      } else if (window.innerWidth < 768) {
        setPageSize(2); // 테블릿
      } else {
        setPageSize(3); // 데스크탑
      }
    };

    window.addEventListener('resize', updatePageSize);
    updatePageSize(); // 초기 크기 설정

    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  return pageSize;
};

export default usePageSize;
