export const throttle = (callback: (arg: any) => void, delay: number) => {
  let timer: NodeJS.Timeout | null;

  return (arg: any) => {
    if (timer) return;
    timer = setTimeout(() => {
      callback(arg);
      timer = null;
    }, delay);
  };
};
