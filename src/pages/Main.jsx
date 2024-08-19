import React from "react";
import BestProducts from "../components/BestProducts";
import Products from "../components/Products";
import useWindowSize from "../hooks/useWindowSize";

export default function Main() {
  const { width } = useWindowSize();

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

  return (
    <>
      <BestProducts itemCount={itemCount} />
      <Products itemCountPerPage={itemCountPerPage} />
    </>
  );
}
