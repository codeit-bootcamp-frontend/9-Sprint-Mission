import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const Container = ({ currentOrder, onOrderChange }) => {
    const dropDownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const className = `option-order ${isOpen ? "active" : undefined}`;
    const handleOrderClick = (order) => {
        onOrderChange(order);
        setIsOpen(false);
    };
    const handleClickOutside = (e) => {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target))
            setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            window.addEventListener("click", handleClickOutside);
        }
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (_jsxs("div", { className: "select-order", children: [_jsx("button", { type: "button", className: "current-order", onClick: () => setIsOpen(!isOpen), children: currentOrder === "recent" ? "최신순" : "좋아요순" }), _jsx("div", { className: className, children: _jsxs("ul", { ref: dropDownRef, children: [_jsx("li", { children: _jsx("button", { type: "button", onClick: () => handleOrderClick("recent"), children: "\uCD5C\uC2E0\uC21C" }) }), _jsx("li", { children: _jsx("button", { type: "button", onClick: () => handleOrderClick("favorite"), children: "\uC88B\uC544\uC694\uC21C" }) })] }) })] }));
};
export default Container;
