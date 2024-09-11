import { useEffect, useState } from "react";
import "./BestProducts.css";
import { getProducts } from "../../api/api";
import { useParams } from "react-router-dom";

interface IProps {
  width: number;
}

interface IProduct {
  id: string;
  images: string;
  name: string;
  price: number;
  favoriteCount: number;
}

const BestProducts: React.FC<IProps> = ({ width }) => {
  const { order = "favorite" } = useParams();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 사용환경에 따른 pageSize 조절
  const calculatePageSize = (width: number) => {
    if (width > 375 && width < 767) {
      return 1;
    } else if (width >= 768 && width < 1199) {
      return 2;
    } else {
      return 4;
    }
  };

  const pageSize = calculatePageSize(width);

  // 베스트 상품 가져오기
  useEffect(() => {
    const getBestProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const bestProducts = await getProducts({ params: { order, pageSize } });
        setProducts(bestProducts.list);
      } catch (error) {
        console.error("베스트상품 getBestProducts에서 오류 발생", error);
        setError("베스트상품 목록을 가져오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    getBestProducts();
  }, [pageSize, order]);

  return (
    <div className="bestProductsContainer">
      <h1 className="title">베스트 상품</h1>
      {!isLoading ? (
        !error ? (
          <div className="productsBox">
            {products.map((item) => (
              <div key={item.id} className="products">
                <img src={item.images} alt={item.name} className="productImg" />
                <h2 className="productTitle">{item.name}</h2>
                <h2 className="productPrice">{item.price.toLocaleString("ko-KR")}원</h2>
                <span className="like">
                  <img src="/icons/like.png" alt="좋아요" />
                  {item.favoriteCount}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="error">{error}</p>
        )
      ) : (
        <p className="loading">베스트상품 목록을 가져오고 있습니다.</p>
      )}
    </div>
  );
};

export default BestProducts;
