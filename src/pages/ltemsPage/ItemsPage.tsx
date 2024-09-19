import { useState, useEffect, ChangeEvent } from "react";
import { getProducts, getProduct } from "../../api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import Searchbar from "./components/Searchbar";
import BestProductList from "./components/BestProductList";
import { Container } from "../../styles/Container";
import ItemDetailPage from "./components/ItemDetailPage";
import { Product } from "../../types/types";

const LIMIT = 10;
const PAGELIMIT = 5;

function ItemsPage() {
  const param = useParams<{ id?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [datas, setDatas] = useState<any>({});

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const options = {
          order,
          page,
          limit: LIMIT,
        };

        if (param.id) {
          const data = await getProduct({ id: param.id });
          setDatas(data);
        } else {
          const data = await getProducts(options);
          setProducts(data.list);
          setTotalPages(Math.ceil(data.totalCount / LIMIT));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [order, page, param.id]);

  return (
    <>
      <Navbar />
      {param.id !== undefined ? (
        <StyledItemsPage>
          <ItemDetailPage datas={datas} id={param.id} />
        </StyledItemsPage>
      ) : (
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
      )}
    </>
  );
}

export default ItemsPage;

const StyledItemsPage = styled(Container)`
  padding: 24px 0 0;

  @media (max-width: 768px) {
    padding: 16px 0 0;
  }
`;
