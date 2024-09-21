import "./BestProductList.css";
import heartImg from "../assets/ic_heart.png";
import { useEffect, useState } from "react";
import { getProducts } from "../api/Api";
import { Link } from "react-router-dom";

export interface List {
  id: number;
  createdAt: Date;
  favoriteCount: number;
  description: string;
  images: string[0];
  name: string;
  ownerId: number;
  price: number;
  updatedAt: Date;
}

export interface Query {
  order: string;
  pageSize: number;
  page: number;
}

//Props로 받을 객체 데이터의 타입 지정

function BestProductListItem({ product }: { product: List }) {
  //Props는 객체
  const { images, name, description, price, favoriteCount } = product;
  return (
    <>
      <div className="product-item-container">
        <img className="product-img" src={images} alt={name} />
      </div>
      <div className="product-info">
        <div className="description">{description}</div>
        <div className="price">{price}</div>
        <div className="like">
          <img className="like-img" src={heartImg} alt="좋아요" />
          <span className="favorite-count">{favoriteCount}</span>
        </div>
      </div>
    </>
  );
}

export function BestProductList() {
  const [products, setProducts] = useState<List[]>([]);

  

  useEffect(() => {
    async function handleLoad(query: Query) {
      const { list } = await getProducts(query);
      setProducts(list);
    }
    handleLoad({
      order: "favorite",
      pageSize: 4,
      page: 1,
    });
  }, []);

  return (
    <ul className="product-list best">
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/items/${product.id}`}>
            <BestProductListItem product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
