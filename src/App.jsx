import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import BestProducts from "./components/BestProducts";
import Products from "./components/Products";
import useWindowSize from "./hooks/useWindowSize";

export default function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  // const { width } = useWindowSize();

  let itemCountPerPage;
  let itemCount;

  if (width >= 1200) {
    itemCountPerPage = 10;
    itemCount = 4;
  } else if (width >= 768) {
    itemCountPerPage = 6;
    itemCount = 2;
  } else if (width < 768) {
    itemCountPerPage = 4;
    itemCount = 1;
  }

  console.log(width, itemCount);

  return (
    <>
      <Header />
      <BestProducts itemCount={itemCount} />
      <Products itemCountPerPage={itemCountPerPage} />
    </>
  );
}
