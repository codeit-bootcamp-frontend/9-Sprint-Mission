const throttle = (callback: (...args: any[]) => void, delay: number) => {
  let timer : NodeJS.Timeout |number|null;

  return (...args: []) => {
    if (timer) return;
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
};

export default throttle;
