import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 페이지 전환 시 제일 상단으로 끌어올려주는 컴포넌트

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;