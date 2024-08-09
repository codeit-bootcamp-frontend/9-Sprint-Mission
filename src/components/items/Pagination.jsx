import { memo, useEffect, useState } from "react";
import "./Pagination.css";
import axios from "axios";

const Pagination = ({ newPageProducts, error, isLoading, totalPage }) => {
  const [page, setPage] = useState(1);
  const [newProducts, setNewProducts] = useState([]);

  // 다음페이지 데이터 가져오는 함수
  const onPageToNext = () => {
    let nextPage = page + 1;

    if (nextPage > 5) {
      setPage(5);
      alert("마지막 페이지입니다.");
    } else {
      setPage(nextPage);
    }
  };

  // 이전페이지 데이터 가져오는 함수
  const onPageToPrev = () => {
    let prevPage = page - 1;
    setPage(prevPage);

    if (prevPage < 1) {
      setPage(1);
      alert("첫번째 페이지입니다.");
    } else {
      setPage(prevPage);
    }
  };

  // 각 페이지로 이동할 수 있도록 page를 바꾸는 함수
  const onClickPage = (e) => {
    const target = e.target;
    const previousTarget = target.previousElementSibling;
    const nextTarget = target.nextElementSibling;

    setPage(target.innerText);

    if (previousTarget) {
      previousTarget.classList.remove("current");
    }

    if (nextTarget) {
      nextTarget.classList.remove("current");
    }

    target.classList.add("current");
  };

  // page에 맞게 해당 제품을 가져오는 함수
  useEffect(() => {
    const getPageProducts = async () => {
      try {
        isLoading(true);
        const response = await axios.get(
          `https://panda-market-api.vercel.app/products/?page=${page}`
        );

        if (response.status === 200) {
          setNewProducts(response.data.list);
          error(null);
        }
      } catch (error) {
        console.error("pagination getPageProducts에서 오류 발생", error);
        error("제품을 가져오지 못했습니다.");
      } finally {
        isLoading(false);
      }
    };

    getPageProducts();
  }, [page, error, isLoading]);

  // 새로 가져온 페이지별 제품을 allProducts로 보내주는 훅
  useEffect(() => {
    if (newProducts && newProducts.length > 0) {
      newPageProducts(newProducts);
    }
  }, [newProducts, newPageProducts]);

  return (
    <div className="paginationContainer">
      <div className="pageNumberBox">
        <button className="numberBoxBtn" onClick={onPageToPrev}>
          <img src="./arrowLeft.png" alt="왼쪽" />
        </button>
        {Array.from({ length: totalPage }, (_, i) => (
          <button key={i} className="pageNumber" onClick={onClickPage}>
            {i + 1}
          </button>
        ))}
        <button className="numberBoxBtn" onClick={onPageToNext}>
          <img src="./arrowRight.png" alt="오른쪽" />
        </button>
      </div>
    </div>
  );
};

export default memo(Pagination);
