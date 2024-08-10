import { useEffect, useState } from "react";
import "./BestProducts.css";
import { getBestProducts } from "../../utils/utils";

const BestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBestProducts("favorite", 4, setProducts);
  }, []);

  return (
    <div className="bestProductsContainer">
      <h1 className="title">베스트 상품</h1>
      <div className="productsBox">
        {products.map((item) => (
          <div key={item.id} className="products">
            <img src={item.images} alt={item.name} className="productImg" />
            <h2 className="productTitle">{item.name}</h2>
            <h2 className="productPrice">{item.price.toLocaleString("ko-KR")}원</h2>
            <span className="like">
              <img src="./like.png" alt="좋아요" />
              {item.favoriteCount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
