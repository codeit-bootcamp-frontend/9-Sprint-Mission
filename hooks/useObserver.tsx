import { useEffect, useRef, useState } from "react";

export const useObserver = (callback: () => void) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => { 
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          savedCallback.current();
        }
      }, { threshold: 1 });
    }

    if (target) observer.current.observe(target);

    return () => {
      if (observer.current && target) {
        observer.current.unobserve(target);
      }
    };
  }, [target]);

  return setTarget;
};

