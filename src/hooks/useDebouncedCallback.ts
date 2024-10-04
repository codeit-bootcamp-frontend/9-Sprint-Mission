// src/hooks/useDebouncedCallback.ts
import { useRef } from "react";

function useDebouncedCallback<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedFunction;
}

export default useDebouncedCallback;
