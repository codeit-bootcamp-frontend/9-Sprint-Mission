import React, { useEffect, useState } from "react";
import { getProducts } from "../../../shared/api/item/items";

function AllItemsSection() {
  const [items, setItems] = useState([]);
  const params = {};

  const handleFetchItems = (respondedData) => {
    setItems(respondedData);
  };

  const fetch = async (handleFetchItems) =>
    await getProducts(handleFetchItems, params);

  useEffect(() => {
    fetch(handleFetchItems);
  });

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

export default AllItemsSection;
