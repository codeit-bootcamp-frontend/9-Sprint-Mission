import { useEffect, useState } from "react";
import { getProducts } from "../../../entities/item/api/items";
import ItemCard from "./item-card";

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
    const responseInfo = await getProducts(searchParams);
    setItems(responseInfo.data.list);
  };

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    handleFetchedItems({ pageSize, orderBy: "favorite" });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <div className="bestItemsContainer">
      <div className="sectionTitle">베스트 상품</div>

      <div className="bestItemsCardSection">
        {items?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItemsSection;
