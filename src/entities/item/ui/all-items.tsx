import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import usePageSize, { SORT_TYPE } from "../lib/usePageSize";
import useProducts from "../lib/useProducts";
import ItemCard from "./item-card";
import { ReactComponent as SearchIcon } from "../../../shared/assets/images/icons/ic_search.svg";
import { ReactComponent as DropDownIcon } from "../../../shared/assets/images/icons/arrow_drop_down.svg";
import DropdownList from "../../../shared/ui/dropdown-list";
import Pagination from "../../../shared/ui/pagination";
import { ProductResponse, Product } from "../types/product";

// Styled Components
const AllItemsContainer = styled.div`
  padding: 16px 24px;
`;

const AllItemsSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SectionTitle = styled.div`
  color: #111827;
  font-weight: bold;
  font-size: 20px;
  line-height: normal;
  position: relative;
  padding: 10px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
  align-items: center;
`;

const SearchBarInput = styled.input`
  height: 20px;
  width: 100%;
  border: none;
  flex: 1;
  background-color: inherit;

  ::placeholder {
    color: #9ca3af;
    font-size: 16px;
  }

  &:focus {
    outline: none;
  }
`;

const AddItemWrapper = styled.div`
  margin-left: 8px;
`;

const SortButtonWrapper = styled.div`
  position: relative;
`;

const SortDropdownTriggerButton = styled.button`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 9px;
  margin-left: 8px;
`;

const SortName = styled.div`
  width: 80px;
  position: relative;
  float: left;
  top: 8px;
`;

const AllItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 8px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 16px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 40px 24px;
  }
`;

const PaginationBarWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 80px;
`;

function AllItemsSection() {
  const pageSize = usePageSize(SORT_TYPE.recent);
  const [orderBy, setOrderBy] = useState<
    (typeof SORT_TYPE)[keyof typeof SORT_TYPE]
  >(SORT_TYPE.recent);
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { list, totalCount }: ProductResponse = useProducts(
    page,
    pageSize,
    orderBy,
    searchQuery
  );
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  const sortOptions = [
    { label: "최신순", value: SORT_TYPE.recent },
    { label: "인기순", value: SORT_TYPE.favorite },
  ];

  const handleSortDropdown = (
    sortType: (typeof SORT_TYPE)[keyof typeof SORT_TYPE]
  ) => {
    setOrderBy(sortType);
    setIsDropdown(false);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(keyword);
      setPage(1);
    }
  };

  return (
    <AllItemsContainer>
      <AllItemsSectionHeader>
        <SectionTitle>전체 상품</SectionTitle>
        <SearchBarWrapper>
          <SearchIcon />
          <SearchBarInput
            autoFocus
            placeholder="검색할 상품을 입력하고 엔터키를 눌러주세요"
            value={keyword}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </SearchBarWrapper>
        <AddItemWrapper>
          <Link to="/additem" className="menu-link button">
            상품 등록하기
          </Link>
        </AddItemWrapper>
        <SortButtonWrapper>
          {isDropdown && (
            <DropdownList
              sortOptions={sortOptions}
              onSortSelection={handleSortDropdown}
            />
          )}
          <SortDropdownTriggerButton onClick={handleDropdown}>
            <SortName>
              {orderBy === SORT_TYPE.recent ? "최신순" : "인기순"}
            </SortName>
            <DropDownIcon height="26px" />
          </SortDropdownTriggerButton>
        </SortButtonWrapper>
      </AllItemsSectionHeader>

      <AllItemsCardSection>
        {list?.map((item: Product) => (
          <ItemCard key={`market-item-${item.id}`} item={item} />
        ))}
      </AllItemsCardSection>

      <PaginationBarWrapper>
        <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </PaginationBarWrapper>
    </AllItemsContainer>
  );
}

export default AllItemsSection;
