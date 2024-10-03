import { usePathname } from "next/navigation";
import { useEffect } from "react";

// 페이지 전환 시 제일 상단으로 끌어올려주는 커스텀 훅

const useScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
};

export default useScrollToTop;