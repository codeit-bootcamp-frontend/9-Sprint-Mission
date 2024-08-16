import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "./Products.css";
import { getProducts } from "../utils/api";
import Product from "./Product";

// 보여줄 페이지 갯수
const PAGE_COUNT = 5;

export default function Products({ itemCountPerPage = 10 }) {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [orderBy, setOrderBy] = useState("recent");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(1); // 시작 페이지 설정

  const totalPages = Math.ceil(totalCount / itemCountPerPage); // 총 페이지 개수
  const noPrev = start === 1; // 이전 페이지가 없는 경우
  const noNext = start + PAGE_COUNT - 1 >= totalPages; // 다음 페이지가 없는 경우

  // console.log(items);
  const loadProducts = async (options) => {
    let result;

    try {
      setError(false);
      setIsLoading(true);
      result = await getProducts(options);
    } catch (error) {
      setError(true);
      return;
    } finally {
      setIsLoading(false);
    }
    const { list, totalCount } = result;
    setItems(list);
    setTotalCount(totalCount);
  };

  const handleChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handlePrev = () => {
    setCurrentPage(start - 1);
  };

  const handleNext = () => {
    setCurrentPage(start + PAGE_COUNT);
  };

  const handlePageClick = (e) => {
    // console.log(e.target.value);
    setCurrentPage(Number(e.target.innerText));
  };

  useEffect(() => {
    loadProducts({ orderBy, currentPage, itemCountPerPage });
  }, [orderBy, currentPage, itemCountPerPage]);

  useEffect(() => {
    if (currentPage === start + PAGE_COUNT) {
      setStart((prev) => prev + PAGE_COUNT);
    }

    if (currentPage < start) {
      setStart((prev) => prev - PAGE_COUNT);
    }
  }, [currentPage, PAGE_COUNT, start]);

  return (
    <>
      <section>
        <div id='search-bar'>
          <h3>전체 상품</h3>
          <div className='right'>
            <div className='input-bar'>
              <input type='text' placeholder='검색할 상품을 입력해주세요' />
            </div>
            <button>상품등록하기</button>
            <select onChange={handleChange}>
              <option value='recent'>최신순</option>
              <option value='favorite'>좋아요순</option>
            </select>
          </div>
        </div>
      </section>
      <section id='all-products'>
        <div className='wrapper'>
          <ul id='product-lists'>
            {items.map((item) => {
              return (
                <li key={item.id} className='product-list'>
                  <Product key={item.id} props={item} />
                </li>
              );
            })}
          </ul>
        </div>
        <div id='pagination'>
          <button className='button' disabled={noPrev} onClick={handlePrev}>
            <FaAngleLeft />
          </button>
          {[...Array(PAGE_COUNT)].map((_, i) => {
            // start + i가 totalPages 이하인 경우에만 버튼을 렌더링
            if (start + i <= totalPages) {
              return (
                <li key={i}>
                  <button
                    className={
                      currentPage === start + i ? "active button" : "button"
                    }
                    onClick={handlePageClick}
                  >
                    {start + i}
                  </button>
                </li>
              );
            }
            // 조건이 맞지 않으면 null을 반환
            return null;
          })}
          <button className='button' disabled={noNext} onClick={handleNext}>
            <FaAngleRight />
          </button>
        </div>
      </section>
    </>
  );
}
