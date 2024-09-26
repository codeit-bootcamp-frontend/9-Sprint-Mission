const throttle = (callback: (arg: string) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null;

  return (arg: string) => {
    if (timer) return;
    timer = setTimeout(() => {
      callback(arg);
      timer = null;
    }, delay);
  };
};
