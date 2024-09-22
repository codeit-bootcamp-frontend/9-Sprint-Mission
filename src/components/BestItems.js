import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
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
export function BestItems({ width, page }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bestItems, setBestItems] = useState([]);
    const pageSizeObj = {
        mobile: 1,
        pad: 2,
        pc: 4,
    };
    const pageSize = usePageSizeByWidth(width, pageSizeObj);
    const loadBestItems = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        try {
            const response = yield getPandaItems({
                page,
                pageSize,
                orderBy: "favorite",
                search: "",
            });
            setBestItems(response.list || []);
        }
        catch (err) {
            if (err instanceof Error)
                setError(err);
        }
        finally {
            setLoading(false);
        }
    });
    useEffect(() => {
        loadBestItems();
    }, [pageSize]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error.message] });
    }
    return (_jsxs("section", { id: "section-best", children: [_jsx("div", { className: "section-title-wrapper", children: _jsx("h2", { children: "\uBCA0\uC2A4\uD2B8 \uC0C1\uD488" }) }), _jsx("div", { className: "best-items", children: _jsx(PandaItemList, { items: bestItems }) })] }));
}
