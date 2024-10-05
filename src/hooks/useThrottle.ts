// src/hooks/useThrottle.ts
import { useRef } from "react";

const useThrottle = <T>(func: (...args: unknown[]) => T, limit: number) => {
  const inThrottle = useRef<boolean>(false);

  return (...args: unknown[]) => {
    if (!inThrottle.current) {
      func(...args);
      inThrottle.current = true;
      setTimeout(() => (inThrottle.current = false), limit);
    }
  };
};

export default useThrottle;
