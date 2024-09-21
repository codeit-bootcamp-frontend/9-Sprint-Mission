import { useState, useEffect } from "react";
const getPageSize = (orderBy) => {
    const width = window.innerWidth;
    if (width < 768) {
        return orderBy === "favorite" ? 1 : 4;
    }
    else if (width < 1200) {
        return orderBy === "favorite" ? 2 : 6;
    }
    else {
        return orderBy === "favorite" ? 4 : 10;
    }
};
const usePageSize = (orderBy) => {
    const [pageSize, setPageSize] = useState(getPageSize(orderBy));
    useEffect(() => {
        const handleResize = () => {
            setPageSize(getPageSize(orderBy));
        };
        // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
        window.addEventListener("resize", handleResize);
        // Cleanup function
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [orderBy]);
    return pageSize;
};
export default usePageSize;
