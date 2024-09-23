import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
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
const LIMIT = 10;
const PAGELIMIT = 5;
function ItemsPage() {
    const param = useParams();
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
                }
                else {
                    const data = await getProducts(options);
                    setProducts(data.list);
                    setTotalPages(Math.ceil(data.totalCount / LIMIT));
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        loadData();
    }, [order, page, param.id]);
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), param.id !== undefined ? (_jsx(StyledItemsPage, { children: _jsx(ItemDetailPage, { datas: datas, id: param.id }) })) : (_jsxs(StyledItemsPage, { children: [_jsx(BestProductList, {}), _jsx(Searchbar, { onChange: handleOrderChange }), _jsx(ProductList, { products: products }), _jsx(Pagination, { page: page, totalPages: totalPages, pageLimit: PAGELIMIT, onPageChange: handlePageChange })] }))] }));
}
export default ItemsPage;
const StyledItemsPage = styled(Container) `
  padding: 24px 0 0;

  @media (max-width: 768px) {
    padding: 16px 0 0;
  }
`;
