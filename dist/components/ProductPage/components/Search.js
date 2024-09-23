import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Search = ({ handleChangeSelect }) => {
    return (_jsxs("div", { className: "product-search", children: [_jsxs("form", { className: "product-search-input", children: [_jsx("input", { placeholder: "\uAC80\uC0C9\uD560 \uC0C1\uD488\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694" }), _jsx("button", { type: "button", className: "search-button" })] }), _jsx(Link, { to: "/additem", className: "product-button", children: "\uC0C1\uD488 \uB4F1\uB85D\uD558\uAE30" }), _jsxs("select", { className: "product-select", name: "search", onChange: handleChangeSelect, children: [_jsx("option", { value: "recent", children: "\uCD5C\uC2E0\uC21C" }), _jsx("option", { value: "favorite", children: "\uC88B\uC544\uC694\uC21C" })] })] }));
};
export default Search;
