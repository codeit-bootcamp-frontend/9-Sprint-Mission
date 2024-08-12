import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import DropdownList from "./DropdownList";
import PaginationBar from "./PagenationBar";
import "./AllProducts.css";
import { ReactComponent as SortIcon } from "../assets/ic_sort.svg";
import { Link } from "react-router-dom";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1200) {
    return 6;
  } else {
    return 10;
  }
};

const ProductItem = ({ product }) => {
  return (
    <li key={product.id}>
      <img
        className="allProduct-img"
        src={product.images[0]}
        width="168"
        height="168"
        alt="상품"
      />
      <div className="allProduct-name">{product.name}</div>
      <div className="allProduct-price">{product.price}</div>
      <div className="allProduct-favorite">♡ {product.favoriteCount}</div>
    </li>
  );
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [orderBy, setOrderBy] = useState("recent");
  const [totalPageNum, setTotalPageNum] = useState();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLoad = async (options) => {
    let result;
    try {
      result = await getProducts(options);
    } catch (error) {
      console.log(error.message);
      return;
    }
    const { list } = result;
    const { totalCount } = result;
    setProducts(list);
    setTotalPageNum(Math.ceil(totalCount / pageSize));
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
    setIsDropdownVisible(false);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    handleLoad({ orderBy, page, pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);

  return (
    <section className="allProducts-wrap">
      <div className="allProduct-header-wrap">
        <h2 className="allProducts-title">전체 상품</h2>
        <Link className="product-regist" to={"/addItem"}>
          상품 등록하기
        </Link>
      </div>
      <div className="search-sort-wrap">
        <input
          className="searchInput"
          placeholder="검색할 상품을 입력해주세요"
        ></input>
        <div className="sortButton-wrapper">
          <button
            className="sortDropdownTriggerButton"
            onClick={toggleDropdown}
          >
            <SortIcon />
          </button>
          {isDropdownVisible && (
            <DropdownList onSortSelection={handleSortSelection} />
          )}
        </div>
      </div>
      <ul className="allProduct-list">
        {products.map((product) => (
          <ProductItem product={product} />
        ))}
      </ul>
      <PaginationBar
        totalPageNum={totalPageNum}
        activePageNum={page}
        onPageChange={onPageChange}
      />
    </section>
  );
};

export default AllProducts;
