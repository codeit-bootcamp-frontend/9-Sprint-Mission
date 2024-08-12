import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import "./BestProducts.css";

const ProductItem = ({ product }) => {
  return (
    <li key={product.id}>
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [orderBy, setOrderBy] = useState("favorite");
  const [visibleCount, setVisibleCount] = useState(1);

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

  useEffect(() => {
    handleLoad({ page, pageSize, orderBy });

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
          <ProductItem product={product} />
        ))}
      </ul>
    </section>
  );
};

export default BestProducts;
