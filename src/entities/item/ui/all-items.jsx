import { useState } from "react";
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
  const { items, totalCount } = useProducts(page, pageSize, orderBy);
  const [isDropdown, setIsDropdown] = useState(false);

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

  return (
    <div>
      <div className="allItemsSectionHeader">
        <div className="sectionTitle">전체 상품</div>
        <div className="searchBarWrapper">
          <SearchIcon />
          <input
            className="searchBarInput"
            placeholder="검색할 상품을 입력해 주세요"
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
