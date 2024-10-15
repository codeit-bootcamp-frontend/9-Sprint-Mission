import { useEffect, useState } from "react";

const useDebounce = (value: number, delay: number) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounce;
};

export default useDebounce;
