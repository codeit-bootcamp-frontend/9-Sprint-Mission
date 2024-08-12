import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../entities/item/api/items";
import SearchIcon from "../../../shared/assets/images/icons/ic_search.svg";
import DropDownIcon from "../../../shared/assets/images/icons/dropdown.svg";
import ItemCard from "./item-card";
import Pagination from "../../../shared/ui/pagination";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 10;
  }
};

function AllItemsSection() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [totalCount, setTotalCount] = useState(0);
  const [orderBy, setOrderBy] = useState("recent");
  const [isDropdown, setIsDropdown] = useState(false);

  const handleFetchedItems = async (searchParams) => {
    const responseInfo = await getProducts(searchParams);
    setItems(responseInfo.data.list);
    setTotalCount(responseInfo.data.totalCount);
  };

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

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    handleFetchedItems({ page, pageSize, orderBy });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [page, pageSize, orderBy]);

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
          {isDropdown && (
            <div className="dropdownList">
              <div
                className="dropdownItem"
                onClick={() => handleSortDropdown("recent")}
              >
                최신순
              </div>
              <div
                className="dropdownItem"
                onClick={() => handleSortDropdown("favorite")}
              >
                인기순
              </div>
            </div>
          )}
          <button
            className="sortDropdownTriggerButton"
            onClick={handleDropdown}
          >
            <div className="sortName">
              {orderBy === "recent" ? "최신순" : "인기순"}
            </div>
            <DropDownIcon className="dropdownIcon" />
          </button>
        </div>
      </div>

      <div className="allItemsCardSection">
        {items?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
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
