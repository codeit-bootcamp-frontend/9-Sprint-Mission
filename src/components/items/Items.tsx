import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import BestProducts from "./BestProducts";

const Items = () => {
  const [width, setWidth] = useState(window.innerWidth);

  // 사용환경 확인
  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <main>
      <BestProducts width={width} />
      <AllProducts width={width} />
    </main>
  );
};

export default Items;
