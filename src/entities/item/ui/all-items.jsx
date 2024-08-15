import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import usePageSize, { SORT_TYPE } from "../lib/usePageSize";
import useProducts from "../lib/useProducts";
import ItemCard from "./item-card";
import SearchIcon from "../../../shared/assets/images/icons/ic_search.svg";
import DropDownIcon from "../../../shared/assets/images/icons/arrow_drop_down.svg";
import DropdownList from "../../../shared/ui/dropdown-list";
import Pagination from "../../../shared/ui/pagination";

function AllItemsSection() {
  const pageSize = usePageSize(SORT_TYPE.recent);
  const [orderBy, setOrderBy] = useState(SORT_TYPE.recent);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { items, totalCount } = useProducts(
    page,
    pageSize,
    orderBy,
    searchQuery
  );
  const [isDropdown, setIsDropdown] = useState(false);
  // 입력 필드에 포커스를 설정하기 위한 useRef
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // 컴포넌트 마운트 시 입력 필드에 포커스 설정
    }
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트가 처음 마운트될 때만 실행

  const handleSortDropdown = (sortType) => {
    setOrderBy(sortType);
    setIsDropdown(false);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    // Enter 키를 누를 경우만 검색되도록
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
            ref={inputRef} // 입력 필드에 ref 연결
            className="searchBarInput"
            placeholder="검색할 상품을 입력하고 엔터키를 눌러주세요"
            value={keyword}
            onChange={handleSearchChange} // 입력된 검색어를 keyword 상태에 반영
            onKeyDown={handleSearchKeyDown} // Enter 키를 누를 때만 검색 실행
          />
        </div>
        <div className="addItemWrapper">
          <Link to="/additem" className="loginLink button">
            상품 등록하기
          </Link>
        </div>
        <div className="sortButtonWrapper">
          {isDropdown && <DropdownList onSortSelection={handleSortDropdown} />}
          <button
            className="sortDropdownTriggerButton"
            onClick={handleDropdown}
          >
            <div className="sortName">
              {orderBy === SORT_TYPE.recent ? "최신순" : "인기순"}
            </div>
            <DropDownIcon className="dropdownIcon" />
          </button>
        </div>
      </div>

      <div className="allItemsCardSection">
        {items?.map((item) => (
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
