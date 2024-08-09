import React, { useEffect, useState } from "react";
import { getProducts } from "../../../shared/api/item/items";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1280) {
    return 2;
  } else {
    return 4;
  }
};

function BestItemsSection() {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const handleFetchedItems = async (searchParams) => {
    await getProducts(setItems, searchParams);
  };

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    handleFetchedItems({ pageSize, orderBy: "recent" });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <>
      <div className="wrapper">
        {items.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    </>
  );
}

export default BestItemsSection;
