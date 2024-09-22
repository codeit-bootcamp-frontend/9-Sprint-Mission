import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import { useState } from 'react';
import { NavLink } from "react-router-dom";
import heartIcon from "../img/ic_heart.png";
function PandaItem({ item }) {
    return (_jsxs("div", { className: "panda-item", children: [_jsx("div", { className: "img-box", children: _jsx("img", { className: "product-img", src: item.images, alt: "\uC774\uBBF8\uC9C0", width: "220", height: "220" }) }), _jsxs("div", { className: "item-description", children: [_jsx("b", { className: "item-name", children: item.name }), _jsxs("strong", { className: "item-price", children: [item.price.toLocaleString(), "\uC6D0"] }), _jsxs("div", { className: "favorite-count", children: [_jsx("img", { src: heartIcon, alt: "\uD558\uD2B8", width: "16", height: "16" }), _jsx("p", { className: "favorite-count", children: item.favoriteCount })] })] })] }));
}
function PandaItemList({ items }) {
    return (_jsx(_Fragment, { children: _jsx("ul", { children: items.map((item) => {
                return (_jsx(NavLink, { to: `/items/${item.id}`, children: _jsx("li", { children: _jsx(PandaItem, { item: item }) }, item.id) }, item.id));
            }) }) }));
}
export { PandaItem, PandaItemList };
