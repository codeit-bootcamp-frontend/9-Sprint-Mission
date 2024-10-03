export const debounce = (callback: (...args: any) => void, delay: number) => {
  let timer: NodeJS.Timeout | null = null;

  if (timer) clearTimeout(timer);
  return (...args: any) => {
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
