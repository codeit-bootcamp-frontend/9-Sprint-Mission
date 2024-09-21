import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import DropdownMenu from "../../../../components/UI/DropdownMenu";
import PaginationBar from "../../../../components/UI/PaginationBar";
import { getProducts } from "../../../../api/itemApi";
import { ReactComponent as SearchIcon } from "../../../../assets/images/icons/ic_search.svg";
import { Link, useNavigate } from "react-router-dom";
import S from "./AllItemsSection.styles";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 4;
  } else if (width < 1280) {
    // Tablet viewport
    return 6;
  } else {
    // Desktop viewport
    return 10;
  }
};

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState();
  const navigate = useNavigate();

  const fetchSortedData = async ({ orderBy, page, pageSize }) => {
    const products = await getProducts({ orderBy, page, pageSize });
    setItemList(products.list);
    setTotalPageNum(Math.ceil(products.totalCount / pageSize));
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCardClick = (productId) => {
    navigate(`/items/${productId}`);
  };

  return (
    <div>
      <S.AllItemsSectionHeader>
        <S.Title>판매 중인 상품</S.Title>
        <S.SearchBarWrapper>
          <SearchIcon />
          <S.SearchBarInput
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
          />
        </S.SearchBarWrapper>
        <Link to="/additem" className="loginLink button">
          상품 등록하기
        </Link>
        <DropdownMenu onSortSelection={handleSortSelection} />
      </S.AllItemsSectionHeader>

      <S.AllItemsCardSection>
        {itemList?.map((item) => (
          <ItemCard
            item={item}
            key={`market-item-${item.id}`}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </S.AllItemsCardSection>

      <S.PaginationBarWrapper>
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </S.PaginationBarWrapper>
    </div>
  );
}

export default AllItemsSection;
