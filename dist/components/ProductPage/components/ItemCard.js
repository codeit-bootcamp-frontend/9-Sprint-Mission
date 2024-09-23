import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const ItemCard = ({ item }) => {
    const { images, name, price, favoriteCount, id } = item;
    return (_jsx("li", { children: _jsxs(Link, { to: `/items/${id}`, className: "product-box", children: [_jsx("div", { className: "img-box", children: _jsx("img", { src: images[0], alt: name }) }), _jsx("p", { className: "txt", children: name }), _jsxs("h3", { className: "price", children: [price, "\uC6D0"] }), _jsxs("div", { className: "heart-wrap", children: [_jsx("button", { className: "heart-button", type: "button" }), _jsx("p", { className: "count", children: favoriteCount })] })] }) }));
};
export default ItemCard;
