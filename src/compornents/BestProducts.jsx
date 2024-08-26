import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api';
import like from '../svg/like.svg';
import '../css/Products.css';

function BestProducts({ page, orderBy }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const data = await getProducts(4, 1, 'favorite');

        const topProducts = data.list;

        setProducts(topProducts);

        // console.log(topProducts); // 전체 데이터를 불러왔는지 콘솔에 출력
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchBestProducts();
  }, ['favorite']);

  const handleProductClick = (productId) => {
    // 제품 클릭 시, 상세 페이지로 이동하는 로직 추가
    navigate(`/items/${productId}?page=${page}&orderBy=${orderBy}`);
  };

  return (
    <>
      <div className="best-products-wrap">
        <h1 className="productType">베스트 상품</h1>
        <ul className="products-wrap">
          {products.map((product) => (
            <li
              key={product.id}
              className="product"
              onClick={() => handleProductClick(product.id)}
            >
              <span>
                <img
                  className="product-img"
                  src={product.images}
                  alt={`${product.name}의 이미지 입니다.`}
                />
              </span>
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
    </>
  );
}

export default BestProducts;
