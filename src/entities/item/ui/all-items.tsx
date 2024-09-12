import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import usePageSize, { SORT_TYPE } from "../lib/usePageSize";
import useProducts from "../lib/useProducts";
import ItemCard from "./item-card";
import { ReactComponent as SearchIcon } from "../../../shared/assets/images/icons/ic_search.svg";
import { ReactComponent as DropDownIcon } from "../../../shared/assets/images/icons/arrow_drop_down.svg";
import DropdownList from "../../../shared/ui/dropdown-list";
import Pagination from "../../../shared/ui/pagination";
import { ProductResponse, Product } from "../types/product"; // 정의된 타입 임포트

function AllItemsSection() {
  const pageSize = usePageSize(SORT_TYPE.recent);

  // SORT_TYPE의 타입을 typeof로 지정합니다.
  const [orderBy, setOrderBy] = useState<
    (typeof SORT_TYPE)[keyof typeof SORT_TYPE]
  >(SORT_TYPE.recent);
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // useProducts의 응답을 ProductResponse 타입으로 정의
  const { list, totalCount }: ProductResponse = useProducts(
    page,
    pageSize,
    orderBy,
    searchQuery
  );
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  const sortOptions: {
    label: string;
    value: (typeof SORT_TYPE)[keyof typeof SORT_TYPE];
  }[] = [
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
    <div>
      <div className="allItemsSectionHeader">
        <div className="sectionTitle">전체 상품</div>
        <div className="searchBarWrapper">
          <SearchIcon />
          <input
            autoFocus
            className="searchBarInput"
            placeholder="검색할 상품을 입력하고 엔터키를 눌러주세요"
            value={keyword}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <div className="addItemWrapper">
          <Link to="/additem" className="menu-link button">
            상품 등록하기
          </Link>
        </div>
        <div className="sortButtonWrapper">
          {isDropdown && (
            <DropdownList
              sortOptions={sortOptions}
              onSortSelection={handleSortDropdown}
            />
          )}
          <button
            className="sortDropdownTriggerButton"
            onClick={handleDropdown}
          >
            <div className="sortName">
              {orderBy === SORT_TYPE.recent ? "최신순" : "인기순"}
            </div>
            <DropDownIcon height="26px" />
          </button>
        </div>
      </div>

      <div className="allItemsCardSection">
        {list?.map((item: Product) => (
          <ItemCard key={`market-item-${item.id}`} item={item} />
        ))}
      </div>

      <div className="paginationBarWrapper">
        <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default AllItemsSection;
