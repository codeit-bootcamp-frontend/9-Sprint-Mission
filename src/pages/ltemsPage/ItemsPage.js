import { React, useState, useEffect } from "react";
import { getProducts, getProduct } from "../../api";
import { useParams } from "react-router-dom";

import "./ItemsPage.css";
import Navbar from "../../components/Navbar/Navbar";
import ProductList from "../../components/ProductList/ProductList";
import Pagination from "../../components/Pagination/Pagination";
import Searchbar from "../../components/Searchbar/Searchbar";
import BestProductList from "../../components/BestProductList";
import ItemViewer from "../../components/ItemViewer/ItemViewer";
import Comment from "../../components/Comment/Comment";
import ReturnButton from "../../components/ReturnButton/ReturnButton";

const LIMIT = 10;

function ItemsPage() {
  const param = useParams();

  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewer, setViewer] = useState({});

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

  useEffect(() => {
    const handleLoad = async () => {
      if (!param.id) return;

      try {
        const data = await getProduct({ id: param.id });
        setViewer(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleLoad();
  }, [param.id]);

  return (
    <>
      {!param.id ? (
        <>
          <Navbar />
          <div className="container">
            <BestProductList />
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
      ) : (
        <>
          <Navbar />
          <div className="container">
            <ItemViewer viewer={viewer} />
            <Comment id={param.id} />
            <ReturnButton />
          </div>
        </>
      )}
    </>
  );
}

export default ItemsPage;
