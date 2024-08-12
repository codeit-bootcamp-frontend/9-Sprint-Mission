import { useState, useEffect } from "react";
import { getProducts } from "./api";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/ProductList/ProductList";
import Pagination from "./components/Pagination/Pagination";
import Searchbar from "./components/Searchbar/Searchbar";
import BestProductList from "./components/BestProductList";

const LIMIT = 10;

function App() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        setTotalPages(Math.ceil(data.totalCount / LIMIT));
      } catch (error) {
        console.error(error);
      }
    };

    const options = {
      order,
      page,
      limit: LIMIT,
    };
    handleLoad(options);
  }, [order, page]);
  return (
    <>
      <Navbar />

      <div className="container">
        <h2 className="best-product-title">베스트 상품</h2>
        {<BestProductList />}

        <Searchbar onChange={handleOrderChange} />
        <ProductList products={products} />
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
