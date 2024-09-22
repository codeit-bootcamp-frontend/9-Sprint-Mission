import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getItemById } from "../api";
import "./App.css";
import styles from "./styles/ItemEach.module.css";
import heartIcon from "../img/ic_heart.png";
import { TagOnly } from "./TagOnly";
import { Kebab } from "./Kebab";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function ItemEach({ id }) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loadEachItem = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        try {
            const itemInfo = yield getItemById({ id });
            setItem(itemInfo);
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
        loadEachItem();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error.message] });
    }
    return (_jsx(_Fragment, { children: item && (_jsxs("div", { className: styles.productWrapper, children: [_jsx("div", { children: _jsx("img", { className: styles.productImg, src: item.images, alt: item.name, width: "486", height: "486" }) }), _jsxs("div", { className: styles.productInfoBox, children: [_jsxs("div", { children: [_jsxs("div", { className: styles.productHeader, children: [_jsxs("h1", { className: styles.prucuctTitle, children: [item.name, " \uD314\uC544\uC694", _jsx(Kebab, {})] }), _jsxs("div", { className: styles.productPrice, children: [item.price.toLocaleString(), "\uC6D0"] })] }), _jsxs("div", { className: styles.productDescriptionWrapper, children: [_jsx("h2", { className: styles.productInfoTitle, children: "\uC0C1\uD488 \uC18C\uAC1C" }), _jsx("div", { className: styles.productDecription, children: item.description }), _jsx("h2", { className: styles.productInfoTitle, children: "\uC0C1\uD488 \uD0DC\uADF8" }), _jsx("div", { className: styles.productTags, children: item.tags.map((tag, index) => (_jsx(TagOnly, { value: tag }, index))) })] })] }), _jsxs("div", { className: styles.extraInfo, children: [_jsxs("div", { className: styles.writerProfile, children: [_jsxs("button", { type: "button", className: styles.sellerProfileBtn, children: [_jsx("div", { className: "blind", children: "\uD310\uB9E4\uC790 \uD504\uB85C\uD544" }), _jsx("div", { className: styles.sellerProfile })] }), _jsxs("div", { className: styles.writerInfo, children: [_jsx("div", { className: styles.writerId, children: "\uCD1D\uBA85\uD55C \uD310\uB2E4" }), _jsx("div", { className: styles.writerDate, children: "2024.01.22" })] })] }), _jsx("div", { className: styles.BtnWrapper, children: _jsxs("button", { type: "button", className: styles.favoriteBtn, children: [_jsx("img", { src: heartIcon, alt: "\uD558\uD2B8", width: "32", height: "32" }), _jsx("div", { children: item.favoriteCount })] }) })] })] })] })) }));
}
