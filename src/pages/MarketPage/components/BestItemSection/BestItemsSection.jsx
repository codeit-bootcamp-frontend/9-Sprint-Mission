import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../../api/itemApi";
import ItemCard from "../ItemCard/ItemCard";
import S from "./BestItemsSection.styles";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 1;
  } else if (width < 1280) {
    // Tablet viewport
    return 2;
  } else {
    // Desktop viewport
    return 4;
  }
};

function BestItemsSection() {
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const navigate = useNavigate();

  const fetchSortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  const handleCardClick = (productId) => {
    navigate(`/items/${productId}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy: "favorite", pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <S.Container>
      <S.Title>베스트 상품</S.Title>
      <S.CardList>
        {itemList?.map((item) => (
          <ItemCard
            item={item}
            key={`best-item-${item.id}`}
            onClick={() => handleCardClick(item.id, item)}
          />
        ))}
      </S.CardList>
    </S.Container>
  );
}

export default BestItemsSection;
