import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import "./BestProducts.css";

const ProductItem = ({ product }) => {
  return (
    <li>
      <img
        className="product-img"
        src={product.images[0]}
        width="343"
        height="343"
        alt="상품"
      />
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price}</div>
      <div className="product-favorite">♡ {product.favoriteCount}</div>
    </li>
  );
};

const BestProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const handleLoad = async (options) => {
      let result;
      try {
        result = await getProducts(options);
      } catch (error) {
        console.log(error.message);
        return;
      }
      const { list } = result;
      setProducts(list);
    };

    handleLoad({ page: 1, orderBy: "favorite" });

    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setVisibleCount(4);
      } else if (width >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  return (
    <section className="bestProducts-wrap">
      <h2 className="bestProducts-title">베스트 상품</h2>
      <ul className="bestProductList-wrap">
        {products.slice(0, visibleCount).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default BestProducts;
