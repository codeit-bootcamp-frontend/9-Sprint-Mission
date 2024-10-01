import { useState, useEffect } from "react";

const SIZES = {
  mobile: 768,
  tablet: 1200,
};

interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<number | null>(null); // screenSize는 number 또는 null 타입

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize(window.innerWidth); // 클라이언트에서만 실행
    };

    updateScreenSize(); // 처음 마운트 시 화면 크기 설정

    window.addEventListener("resize", updateScreenSize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  // 화면 크기가 설정되지 않은 경우 기본값을 반환
  if (screenSize === null) {
    return { isMobile: false, isTablet: false, isDesktop: false };
  }

  // 현재 화면 크기에 따라 모바일, 태블릿, 데스크탑 구분
  const isMobile = screenSize <= SIZES.mobile;
  const isTablet = screenSize > SIZES.mobile && screenSize <= SIZES.tablet;
  const isDesktop = screenSize > SIZES.tablet;

  return { isMobile, isTablet, isDesktop };
}

export default useScreenSize;
