import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import getProducts from "@/api/getProduct";
import ItemCard from "./ItemCard";
import styled from "styled-components";

// Product 타입을 같은 파일 내에 정의합니다.
interface Product {
  id: number;
  name: string;
  price: number;
}

const getPageSize = (): number => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1; // Mobile viewport
  } else if (width < 1280) {
    return 2; // Tablet viewport
  } else {
    return 4; // Desktop viewport
  }
};

const BestItemsSection = () => {
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const router = useRouter();

  // API에서 사용할 매개변수의 타입 정의
  const fetchSortedData = async ({
    orderBy,
    pageSize,
  }: {
    orderBy: string;
    pageSize: number;
  }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  const handleCardClick = (productId: number) => {
    router.push(`/items/${productId}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산하여 상태 업데이트
    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy: "favorite", pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);

  return (
    <Container>
      <Title>베스트 상품</Title>
      <CardList>
        {itemList?.map((item) => (
          <ItemCard
            item={item}
            key={`best-item-${item.id}`}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </CardList>
    </Container>
  );
};

export default BestItemsSection;

// 스타일 컴포넌트 정의
const Container = styled.div`
  padding-top: 17px;
  padding-bottom: 24px;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Title = styled.h1`
  flex-grow: 1;
  color: #111827;
  font-weight: bold;
  font-size: 20px;
  line-height: normal;
`;

const CardList = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
