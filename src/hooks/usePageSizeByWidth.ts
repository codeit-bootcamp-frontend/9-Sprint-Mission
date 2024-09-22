import { useEffect, useState } from "react";

interface PageSizeObj {
  mobile: number;
  pad: number;
  pc: number;
}
export const usePageSizeByWidth = (width: number, pageSizeObj: PageSizeObj) => {
  // width에 따라 pagesize 초기값을 다르게 받아오기
  const initialPageSize = (width: number) => {
    if (width <= 780) {
      return pageSizeObj.mobile;
    } else if (width <= 991 && width > 781) {
      return pageSizeObj.pad;
    } else {
      return pageSizeObj.pc;
    }
  };

  //pagesize 상태 관리
  const [pageSize, setPageSize] = useState(() => initialPageSize(width));

  useEffect(() => {
    setPageSize(initialPageSize(width));
  }, [width]);

  return pageSize;
};
