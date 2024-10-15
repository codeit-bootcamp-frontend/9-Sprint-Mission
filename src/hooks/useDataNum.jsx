import { useState, useEffect } from "react";

function useDataNum(
  items = { mobile: [1, 4], tablet: [2, 6], desktop: [4, 10] }
) {
  const SIZES = {
    mobile: 768,
    tablet: 1200,
  };

  const [dataNum, setDataNum] = useState(() => {
    const width = window.innerWidth;
    if (width <= SIZES.mobile) {
      return items.mobile;
    } else if (width <= SIZES.tablet) {
      return items.tablet;
    } else {
      return items.desktop;
    }
  });

  // 화면 크기에 따라 아이템 개수를 업데이트하는 함수
  const updateDataNum = () => {
    const width = window.innerWidth;
    if (width <= SIZES.mobile) {
      setDataNum(items.mobile);
    } else if (width <= SIZES.tablet) {
      setDataNum(items.tablet);
    } else {
      setDataNum(items.desktop);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateDataNum);

    return () => {
      window.removeEventListener("resize", updateDataNum);
    };
  }, []);

  return dataNum;
}

export default useDataNum;
