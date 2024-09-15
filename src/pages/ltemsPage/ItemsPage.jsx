import { React, useState, useEffect } from "react";
import { getProducts, getProduct } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import Searchbar from "./components/Searchbar";
import BestProductList from "./components/BestProductList";
import { Container } from "../../styles/Container";
import ItemDetailPage from "./components/ItemDetailPage";

const LIMIT = 10;
const PAGELIMIT = 5;

function ItemsPage() {
  const param = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [datas, setDatas] = useState({});

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleOrderChange = (e) => {
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

  const isId = !param.id && param.id !== 0;

  useEffect(() => {
    const handleLoad = async () => {
      if (isId) {
        navigate("/");
        return;
      }

      try {
        const data = await getProduct({ id: param.id });
        setDatas(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleLoad();
  }, [param.id, navigate, isId]);

  return (
    <>
      {isId ? (
        <>
          <Navbar />
          <StyledItemsPage>
            <BestProductList />
            <Searchbar onChange={handleOrderChange} />
            <ProductList products={products} />
            <Pagination
              page={page}
              totalPages={totalPages}
              pageLimit={PAGELIMIT}
              onPageChange={handlePageChange}
            />
          </StyledItemsPage>
        </>
      ) : (
        <ItemDetailPage datas={datas} id={param.id} />
      )}
    </>
  );
}

export default ItemsPage;

const StyledItemsPage = styled.div`
  ${Container};
  padding: 24px 0 0;

  @media (max-width: 768px) {
    padding: 16px 0 0;
  }
`;
