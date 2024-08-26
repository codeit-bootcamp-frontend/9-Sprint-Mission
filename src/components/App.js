import "./App.css";

import { Header } from "./Header";
import { BestItems } from "./BestItems";
import { AllItems } from "./AllItems";
import { useEffect, useState } from "react";
import throttle from "../throttle";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  //리사이즈가 발생할때마다 width 상태를 업데이트하는 핸들러 = throttle의 콜백함수
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    const throttleResizeHandler = throttle(handleResize, 500);
    window.addEventListener("resize", throttleResizeHandler);

    return () => {
      window.removeEventListener("resize", throttleResizeHandler);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <BestItems width={width} />
        <AllItems width={width} />
      </main>
    </>
  );
}
export default App;
