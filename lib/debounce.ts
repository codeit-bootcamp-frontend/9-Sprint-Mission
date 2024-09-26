export const debounce = <T>(callback: (value: T) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (value: T) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
};
