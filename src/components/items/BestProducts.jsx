import axios from "axios";
import { useEffect, useState } from "react";
import "./BestProducts.css";

const BestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getBestProducts = async () => {
      try {
        const response = await axios.get("https://panda-market-api.vercel.app/products/");

        if (response.status === 200) {
          const sortedProducts = response.data.list.sort(
            (a, b) => b.favoriteCount - a.favoriteCount
          );
          setProducts(sortedProducts);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("BestProducts getBestProducts에서 오류 발생", error);
          alert("상품정보를 가져오지 못했습니다.");
        }
      }
    };

    getBestProducts();
  }, []);

  return (
    <div className="bestProductsContainer">
      <h1 className="title">베스트 상품</h1>
      <div className="productsBox">
        {products.map((item) => (
          <div key={item.id} className="products">
            <img src={item.images} alt={item.name} className="productImg" />
            <h2 className="productTitle">{item.description}</h2>
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
