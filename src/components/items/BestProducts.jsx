import { useEffect, useState } from "react";
import "./BestProducts.css";
import { getBestProducts } from "../../utils/utils";

const BestProducts = ({ width }) => {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(4);

  // 사용환경에 따른 pageSize 조절
  useEffect(() => {
    if (width > 375 && width < 767) {
      setPageSize(1);
    } else if (width >= 768 && width < 1199) {
      setPageSize(2);
    } else {
      setPageSize(4);
    }
  }, [width]);

  // 베스트 상품 가져오기
  useEffect(() => {
    getBestProducts("favorite", pageSize, setProducts);
  }, [pageSize]);

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
