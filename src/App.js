import { useState, useEffect } from "react";
import { getProducts } from "./api";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import Searchbar from "./components/Searchbar";
import BestProductList from "./components/BestProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const pageLimit = 5;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleOrderChange = (e) => {
    console.log(e.target.value);
    setOrder(e.target.value);
  };

  useEffect(() => {
    const handleLoad = async (options) => {
      try {
        const data = await getProducts(options);
        setProducts(data.list);
        setTotalPages(Math.ceil(data.totalCount / limit));
      } catch (error) {
        console.error(error);
      }
    };

    const options = {
      order,
      offset: (page - 1) * limit,
      limit,
    };
    handleLoad(options);
  }, [order, page]);
  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="best-product-title">베스트 상품</h2>
        {<BestProductList className={"best-product-list"} />}

        <Searchbar onChange={handleOrderChange} />
        <ProductList
          products={products}
          order={order}
          className={"products-list"}
        />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        pageLimit={pageLimit}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default App;
