import { useState, useEffect } from "react";
import useScreenSize from "@/hooks/useScreenSize"; // 새로운 훅 가져오기

function useDataNum(items = { mobile: 1, tablet: 2, desktop: 3 }) {
  const { isMobile, isTablet, isDesktop } = useScreenSize(); // 화면 크기 정보 가져오기
  const [dataNum, setDataNum] = useState(items.desktop); // 기본값 설정

  useEffect(() => {
    // 화면 크기에 따라 dataNum 업데이트
    if (isMobile) {
      setDataNum(items.mobile);
    } else if (isTablet) {
      setDataNum(items.tablet);
    } else if (isDesktop) {
      setDataNum(items.desktop);
    }
  }, [isMobile, isTablet, isDesktop, items]); // 관련 의존성 추가

  return dataNum;
}

export default useDataNum;
