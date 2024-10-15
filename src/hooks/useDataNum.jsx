import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

function useDataNum(
  items = { mobile: [1, 4], tablet: [2, 6], desktop: [4, 10] }
) {
  const SIZES = useMemo(
    () => ({
      mobile: 768,
      tablet: 1200,
    }),
    []
  );

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

  useEffect(() => {
    // 화면 크기에 따라 아이템 개수를 업데이트하는 함수 : 디바운싱 적용
    const updateDataNum = debounce(() => {
      const width = window.innerWidth;
      const newDataNum =
        width <= SIZES.mobile
          ? items.mobile
          : width <= SIZES.tablet
          ? items.tablet
          : items.desktop;

      if (newDataNum !== dataNum) {
        setDataNum(newDataNum);
      }
    }, 300); // 300ms 동안 이벤트가 없으면 실행

    window.addEventListener("resize", updateDataNum);

    return () => {
      window.removeEventListener("resize", updateDataNum);
    };
  }, [items, SIZES, dataNum]);

  return dataNum;
}

export default useDataNum;
