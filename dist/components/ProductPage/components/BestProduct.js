import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getPandaMarket } from "../../../api";
import ItemCard from "./ItemCard";
import usePageSize from "../../hooks/usePageSize";
const BestProduct = () => {
    const pageSize = usePageSize("favorite");
    const [bestItems, setBestItems] = useState([]);
    useEffect(() => {
        const fetchPandaMarket = async () => {
            const products = await getPandaMarket({
                orderBy: "favorite",
                pageSize,
            });
            setBestItems(products.list);
        };
        fetchPandaMarket();
    }, [pageSize]);
    return (_jsxs("div", { id: "product-best", children: [_jsx("h2", { className: "product-tit", children: "\uBCA0\uC2A4\uD2B8 \uC0C1\uD488" }), _jsx("ul", { className: "product-wrap", children: bestItems?.map((item) => _jsx(ItemCard, { item: item }, item.id)) })] }));
};
export default BestProduct;
