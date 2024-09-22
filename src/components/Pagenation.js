import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { getPandaItems } from "../api";
import { memo, useEffect, useState } from "react";
import styles from "./styles/Pagination.module.css";
export const PagenationBtn = memo(({ page, totalPage, onPageChange }) => {
    // total page = 13, page = 1
    const [pageList, setPageList] = useState([]); // 페이지 버튼 범위를 값으로 갖는다
    const [pageCount, setPageCount] = useState(5); // 페이지 버튼 범위를 설정하기 위한 상태 관리
    useEffect(() => {
        const startPage = Math.max(1, pageCount - 4); // 페이지버튼 시작
        const endPage = Math.min(totalPage, pageCount); //페이지버튼 끝
        const newPageList = [];
        for (let i = startPage; i <= endPage; i++) {
            newPageList.push(i);
        }
        setPageList(newPageList);
    }, [pageCount, totalPage]);
    // 버튼 눌렀을때 페이지 범위 바뀜
    const onClickPrev = (e) => {
        e.preventDefault();
        if (pageCount > 1) {
            setPageCount(Math.max(pageCount - 5, 1));
        }
    };
    const onClickNext = (e) => {
        e.preventDefault();
        if (pageCount < totalPage) {
            setPageCount(Math.min(pageCount + 5, totalPage));
        }
    };
    const onClickBtn = (pageNum, e) => {
        e.preventDefault();
        onPageChange(pageNum); // 부모컴포넌트에서 page 상태 변경 -> GET 요청
    };
    return (_jsxs("div", { className: styles.pagenation, children: [_jsx("button", { type: "button", onClick: onClickPrev, disabled: pageCount <= 5, children: "<" }), pageList.map((pageNum) => (_jsx("button", { type: "button", onClick: (e) => onClickBtn(pageNum, e), className: pageNum === page ? styles.active : "", children: pageNum }, pageNum))), _jsx("button", { type: "button", onClick: onClickNext, disabled: pageCount >= totalPage, children: ">" })] }));
});
