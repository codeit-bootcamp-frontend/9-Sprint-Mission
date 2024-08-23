import { useEffect, useState } from "react";
import { getProducts } from "../api.js";
import like from "../svg/like.svg";
import "../css/Products.css";

function BestProducts({ orderBy }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const data = await getProducts(4, 1, orderBy);

        const topProducts = data.list;

        setProducts(topProducts);

        // console.log(topProducts); // 전체 데이터를 불러왔는지 콘솔에 출력
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchBestProducts();
  }, [orderBy]);

  return (
    <>
      <div className="best-products-wrap">
        <h1 className="productType">베스트 상품</h1>
        <ul className="products-wrap">
          {products.map((product) => (
            <li key={product.id} className="product">
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
