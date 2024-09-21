import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Pagination = ({ totalPageNum, activePageNum, onClick }) => {
    const maxPages = 5;
    let startPage;
    // totalPageNum = 133(전체상품) / 6(보여지는 상품)
    if (totalPageNum <= maxPages) {
        startPage = 1;
    }
    else {
        startPage = Math.max(activePageNum - Math.floor(maxPages / 2), 1);
        startPage = Math.min(startPage, totalPageNum - maxPages + 1);
    }
    const pages = Array.from({ length: Math.min(maxPages, totalPageNum - startPage + 1) }, (_, index) => startPage + index);
    return (_jsx("section", { className: "Pagination", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "paging-wrap", children: [_jsx("button", { type: "button", className: "left-arrow", disabled: activePageNum === 1, onClick: () => onClick(activePageNum - 1) }), pages.map((page) => (_jsx("button", { type: "button", onClick: () => onClick(page), className: activePageNum === page ? "active" : "", children: page }, page))), _jsx("button", { type: "button", className: "right-arrow", disabled: activePageNum === totalPageNum, onClick: () => onClick(activePageNum + 1) })] }) }) }));
};
export default Pagination;
