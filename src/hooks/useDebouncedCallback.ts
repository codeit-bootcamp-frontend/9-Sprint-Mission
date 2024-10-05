// src/hooks/useDebouncedCallback.ts
import { useRef, useCallback, useEffect } from "react";

/**
 * 주어진 콜백 함수의 실행을 일정 시간 지연시키는 디바운스 훅
 *
 * @param callback - 디바운스할 콜백 함수
 * @param delay - 콜백 함수 호출을 지연할 시간(ms 단위, 기본값: 300ms)
 * @returns 디바운스된 함수
 */
function useDebouncedCallback<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number = 300
) {
  // 타임아웃 ID를 저장할 ref
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 최신 콜백 함수를 저장할 ref
  const callbackRef = useRef(callback);

  // 콜백 함수가 변경될 때마다 ref 업데이트
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 디바운스된 함수 정의
  const debouncedFunction = useCallback(
    (...args: T) => {
      // 기존 타이머 초기화
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 새로운 타이머 설정
      timeoutRef.current = setTimeout(() => {
        // 최신 콜백 함수 호출
        callbackRef.current(...args);
      }, delay);
    },
    [delay] // delay만 의존성으로 설정
  );

  return debouncedFunction;
}

export default useDebouncedCallback;
