// src/hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * 특정 값의 업데이트를 일정 시간 동안 지연시키는 디바운스 훅
 *
 * @param value - 디바운스할 값
 * @param delay - 값 업데이트를 지연할 시간(ms 단위, 기본값: 300ms)
 * @returns 지연된 값
 */
function useDebounce<T>(value: T, delay: number = 300): T {
  // 지연된 값을 저장할 상태 변수
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 지정한 시간(delay) 후에 debouncedValue를 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 컴포넌트 언마운트 또는 값이나 딜레이가 변경될 때 타이머 정리
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value와 delay가 변경될 때마다 효과 재실행

  return debouncedValue;
}

export default useDebounce;
