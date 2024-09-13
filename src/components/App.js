import "./App.css";

import { Header } from "./Header";
import { BestItems } from "./BestItems";
import { AllItems } from "./AllItems.jsx";
import { useCallback, useEffect, useState } from "react";
import throttle from "../throttle";
import { PagenationBtn } from './Pagenation.jsx';

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [pageSize, setPageSize] = useState(10); 

  //리사이즈가 발생할때마다 width 상태를 업데이트하는 핸들러 = throttle의 콜백함수
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  
  //width에 따라 pageSize 변경 
  useEffect(()=>{
    if (width <= 780) {
      setPageSize(4);
    } else if ((width <= 991) & (width > 781)) {
      setPageSize(6);
    } else {
      setPageSize(10); // 기본값
    }
  },[width])

  const [page, setPage] = useState(1); // 페이지네이션 버튼을 누르면 setPage()

  //페이지네이션 컴포넌트에서 버튼 누르면 그 값을 page로 GET 요청 (AllItems 컴포넌트)
  const handlePageChange = useCallback((pageNum) => {
    setPage(pageNum);
  }, []);

  const [totalPage, setTotalPage] = useState(0);

  const getTotalPage = (total)=>{
    setTotalPage(total);
  }

  useEffect(() => {
    const throttleResizeHandler = throttle(handleResize, 500);
    window.addEventListener("resize", throttleResizeHandler);

    return () => {
      window.removeEventListener("resize", throttleResizeHandler);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <BestItems width={width} />
        <AllItems page={page} pageSize={pageSize} getTotalPage={getTotalPage}  />
        <PagenationBtn page={page} totalPage={totalPage} onPageChange={handlePageChange}/>
      </main>
    </>
  );
}
export default App;
