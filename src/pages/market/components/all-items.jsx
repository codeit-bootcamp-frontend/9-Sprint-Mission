import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../entities/item/api/items";
import SearchIcon from "../../../shared/assets/images/icons/ic_search.svg";
import DropDownIcon from "../../../shared/assets/images/icons/dropdown.svg";
import ItemCard from "./item-card";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 12;
  }
};

function AllItemsSection() {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [orderBy, setOrderBy] = useState("recent");
  const [isDropdown, setIsDropdown] = useState(false);

  const handleFetchedItems = async (searchParams) => {
    const responseInfo = await getProducts(searchParams);
    setItems(responseInfo.data.list);
  };

  const handleSortDropdown = (sortType) => {
    setOrderBy(sortType);
    setIsDropdown(false);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  useEffect(() => {
    const handleResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", handleResize);
    handleFetchedItems({ pageSize, orderBy });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize, orderBy]);

  return (
    <div>
      <div className="allItemsSectionHeader">
        <h1 className="sectionTitle">전체 상품</h1>
      </div>

      <div className="allItemsSectionHeader">
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

      <div className="paginationBarWrapper"></div>
    </div>
  );
}

export default AllItemsSection;
