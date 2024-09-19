import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
import { NavLink } from "react-router-dom";
import searchIcon from "../img/ic_search.png";
import Container from "./Container";
import { usePageSizeByWidth } from "../hooks/usePageSizeByWidth";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function AllItems({ width, page, getTotalPage }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [orderBy, setOrderBy] = useState("recent");
    const [search, setSearch] = useState("");
    const pageSizeObj = {
        mobile: 4,
        pad: 6,
        pc: 10,
    };
    const pageSize = usePageSizeByWidth(width, pageSizeObj);
    const loadAllItems = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (loading)
            return;
        setLoading(true);
        try {
            const response = yield getPandaItems({
                page,
                pageSize,
                orderBy,
                search,
            });
            setAllItems(response.list || []);
            const totalPage = Math.ceil(response.totalCount / pageSize);
            getTotalPage(totalPage);
        }
        catch (err) {
            if (err instanceof Error)
                setError(err);
        }
        finally {
            setLoading(false);
        }
    }), [page, pageSize, search, orderBy]);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        const searchInput = target["search"];
        setSearch(searchInput.value.trim());
    };
    const handleOrderChange = (newOrderBy) => {
        setOrderBy(newOrderBy);
    };
    useEffect(() => {
        loadAllItems();
    }, [page, pageSize, orderBy, search]);
    //로딩 처리 & 에러 처리
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error.message] });
    }
    return (_jsxs("section", { id: "section-all", children: [_jsxs("div", { className: "section-title-wrapper", children: [_jsx("h2", { children: "\uC804\uCCB4 \uC0C1\uD488" }), _jsxs("form", { className: "item-option", onSubmit: handleSearchSubmit, children: [_jsxs("div", { className: "search-wrapper", children: [_jsx("img", { src: searchIcon, alt: "\uAC80\uC0C9\uC544\uC774\uCF58", width: "24", height: "24" }), _jsx("input", { className: "search-input", name: "search", placeholder: "\uAC80\uC0C9\uD560 \uC0C1\uD488\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694", value: search, onChange: (e) => setSearch(e.target.value) })] }), _jsx(NavLink, { to: "/additem", children: _jsx("button", { type: "button", className: "add-btn", children: "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30" }) }), _jsx(Container, { currentOrder: orderBy, onOrderChange: handleOrderChange })] })] }), _jsx("div", { className: "all-items", children: _jsx(PandaItemList, { items: allItems }) })] }));
}
