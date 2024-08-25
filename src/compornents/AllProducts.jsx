import { useEffect, useState } from 'react';
import { getProducts } from '../api.js';
import like from '../svg/like.svg';
import search from '../svg/search.svg';
import '../css/Products.css';
import { Link, useNavigate } from 'react-router-dom';

function AllProducts({ pageSize, page, orderBy, onOrderByChange }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts(pageSize, page, orderBy);
        setProducts(data.list);
      } catch (error) {
        console.error('Failed to fetch products');
      }
    };

    fetchAllProducts();
  }, [page, pageSize, orderBy]);

  const handleSortChange = (event) => {
    const selectedSortType =
      event.target.value === '최신순' ? 'recent' : 'favorite';
    onOrderByChange(selectedSortType); // 상위 컴포넌트에 정렬 기준 변경 사항 전달
  };

  const handleProductClick = (productId) => {
    // 제품 클릭 시, 상세 페이지로 이동하는 로직 추가
    navigate(`/items/${productId}?page=${page}&orderBy=${orderBy}`);
  };

  return (
    <div className="all-products-wrap">
      <div className="productType-wrap">
        <h1 className="productType">전체 상품</h1>
        <form className="search-product">
          <button type="submit">
            <img src={search} alt="Search" />
          </button>
          <input placeholder="검색할 상품을 입력해주세요" />
        </form>
        <Link to="/additem" className="additems">
          상품 등록하기
        </Link>
        <select
          className="select-type"
          value={orderBy === 'recent' ? '최신순' : '좋아요순'}
          onChange={handleSortChange}
        >
          <option>최신순</option>
          <option>좋아요순</option>
        </select>
      </div>
      <ul className="products-wrap">
        {products.map((product) => (
          <li
            key={product.id}
            className="product"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              className="product-img"
              src={product.images}
              alt={`${product.name}의 이미지 입니다.`}
            />
            <span className="product-name">{product.name}</span>
            <span className="product-price">
              {product.price.toLocaleString()}원
            </span>
            <span className="product-favorite">
              <img src={like} alt="좋아요 버튼" />
              {product.favoriteCount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
