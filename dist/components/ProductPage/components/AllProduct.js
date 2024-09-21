import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getPandaMarket } from "../../../api";
import Search from "./Search";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import usePageSize from "../../hooks/usePageSize";
const AllProduct = () => {
    const pageSize = usePageSize("recent");
    const [allItems, setAllItems] = useState([]);
    const [orderBy, setOrderBy] = useState("recent");
    const [page, setPage] = useState(1);
    const [totalPageNum, setTotalPageNum] = useState(0);
    useEffect(() => {
        const fetchPandaMarket = async ({ orderBy, pageSize, page }) => {
            const products = await getPandaMarket({ orderBy, pageSize, page });
            setAllItems(products.list);
            setTotalPageNum(Math.ceil(products.totalCount) / pageSize);
        };
        fetchPandaMarket({ orderBy, pageSize, page });
    }, [orderBy, pageSize, page]);
    // 셀렉트 박스 이벤트 핸들러
    const handleChangeSelect = (e) => {
        setOrderBy(e.target.value);
    };
    // 페이지네이션 이벤트 핸들러
    const handleClickButton = (pageNumber) => {
        setPage(pageNumber);
    };
    return (_jsxs("div", { id: "product-all", children: [_jsxs("div", { className: "product-search-wrap", children: [_jsx("h2", { className: "product-tit", children: "\uC804\uCCB4 \uC0C1\uD488" }), _jsx(Search, { handleChangeSelect: handleChangeSelect })] }), _jsx("ul", { className: "product-wrap", children: allItems?.map((item) => _jsx(ItemCard, { item: item }, item.id)) }), _jsx(Pagination, { totalPageNum: totalPageNum, activePageNum: page, onClick: handleClickButton })] }));
};
export default AllProduct;
