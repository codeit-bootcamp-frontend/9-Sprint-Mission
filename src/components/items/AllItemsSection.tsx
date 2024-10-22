import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import ItemCard from "@/components/items/ItemCard";
import DropdownMenu from "@/components/ui/button/DropdownMenu";
import PaginationBar from "@/components/ui/button/PaginationBar";
import SearchIcon from "@/assets/images/icons/ic_search.svg";
import getProducts from "@/api/getProduct";

// Product 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
}

// API 응답 타입 정의
interface GetProductsResponse {
  list: Product[];
  totalCount: number;
}

// fetchSortedData 함수에 사용할 매개변수 타입 정의
interface FetchSortedDataParams {
  orderBy: string;
  page: number;
  pageSize: number;
}

const getPageSize = (): number => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4; // Mobile viewport
  } else if (width < 1280) {
    return 6; // Tablet viewport
  } else {
    return 10; // Desktop viewport
  }
};

const AllItemsSection = () => {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(getPageSize());
  const [itemList, setItemList] = useState<Product[]>([]);
  const [totalPageNum, setTotalPageNum] = useState<number>(0);
  const router = useRouter();

  const fetchSortedData = async ({
    orderBy,
    page,
    pageSize,
  }: FetchSortedDataParams): Promise<void> => {
    const products: GetProductsResponse = await getProducts({
      orderBy,
      page,
      pageSize,
    });
    setItemList(products.list);
    setTotalPageNum(Math.ceil(products.totalCount / pageSize));
  };

  const handleSortSelection = (sortOption: string) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <AllItemsSectionHeader>
        <Title>판매 중인 상품</Title>
        <SearchBarWrapper>
          <Image src={SearchIcon} width={20} height={20} alt="search icon" />
          <SearchBarInput
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
          />
        </SearchBarWrapper>
        <Link href="/additem" className="loginLink button">
          상품 등록하기
        </Link>
        <DropdownMenu onSortSelection={handleSortSelection} />
      </AllItemsSectionHeader>

      <AllItemsCardSection>
        {itemList?.map((item) => (
          <Link key={`market-item-${item.id}`} href={`/items/${item.id}`}>
            <ItemCard item={item} />
          </Link>
        ))}
      </AllItemsCardSection>

      <PaginationBarWrapper>
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </PaginationBarWrapper>
    </div>
  );
};

export default AllItemsSection;

// 스타일 컴포넌트
const AllItemsSectionHeader = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    padding-bottom: 8px;
  }

  &:nth-child(2) {
    padding-bottom: 16px;
  }
`;

const Title = styled.h1`
  flex-grow: 1;
  color: #111827;
  font-weight: bold;
  font-size: 20px;
  line-height: normal;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
  align-items: center;
`;

const AllItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 8px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 16px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 40px 24px;
  }
`;

const PaginationBarWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 80px;
`;

const SearchBarInput = styled.input`
  border: none;
  flex: 1;
  background-color: inherit;
  margin-left: 4px;

  &::placeholder {
    color: #9ca3af;
    font-size: 16px;
  }

  &:focus {
    outline: none;
  }
`;
