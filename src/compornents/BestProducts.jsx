import { useEffect, useState } from "react";
import { getProducts } from "../api.js";
import like from "../svg/like.svg";
import "../css/Products.css";

function BestProducts({ currentPage, pageSize, orderBy }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      // let allProducts = [];
      let page = 1;
      // let totalProducts = 0;
      try {
        // do {
        const data = await getProducts(pageSize, page, orderBy);

        //   if (page === 1) {
        //     totalProducts = data.totalCount; // 전체 데이터 개수 가져오기
        //   }

        //   allProducts = [...allProducts, ...data.list]; // 데이터를 누적
        //   page++; // 다음 페이지로 넘어가기
        // } while (allProducts.length < totalProducts);

        const topProducts = data.list
          .sort((a, b) => b.favoriteCount - a.favoriteCount)
          .slice(0, 4);

        setProducts(topProducts);

        // console.log(topProducts); // 전체 데이터를 불러왔는지 콘솔에 출력
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchBestProducts();
  }, [currentPage, pageSize, orderBy]);

  //금액 단위마다 콤마 찍기 위해 정규식 사용
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <div className="best-products-wrap">
        <h1 className="productType">베스트 상품</h1>
        <ul className="products-wrap">
          {products.map((product) => (
            <li key={product.id} className="product">
              <span>
                <img className="product-img" src={product.images} />
              </span>
              <span className="product-name">{product.name}</span>
              <span className="product-price">
                {formatPrice(product.price)}원
              </span>
              <span className="product-favorite">
                <img src={like} />
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
