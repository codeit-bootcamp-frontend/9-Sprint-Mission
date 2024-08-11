import React, { useEffect, useState } from "react";
import "./Products.css";
import { getProducts } from "../utils/api";
import Product from "./Product";

export default function Products() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    const { list } = result;
    setItems(list);

    // pagination 구현하기 offset 이용
  };

  const handleChange = (e) => {
    setOrderBy(e.target.value);
  };

  useEffect(() => {
    loadProducts({ orderBy });
  }, [orderBy]);

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
      <section>
        <div>
          <ul id='product-lists'>
            {items.map((item) => {
              return (
                <li className='product-list'>
                  <Product props={item} />
                </li>
              );
            })}
          </ul>
        </div>
        <div id='pagination'></div>
      </section>
    </>
  );
}
