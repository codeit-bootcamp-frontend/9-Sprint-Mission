import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail, getProductComment } from "../api"; // 상세 정보를 가져오는 API 함수

function ProductDetail() {
  const { id } = useParams(); // URL에서 제품 ID를 가져옴
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductDetail(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };
    const fetchProductComments = async () => {
      try {
        const data = await getProductComment(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };

    fetchProductComments();
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <img src={product.images} alt={`${product.name}의 이미지`} />
      </div>
      <div className="product-detail">
        <h2>{product.name}</h2>
        <p>{product.price.toLocaleString()}원</p>
      </div>
      <div>
        <p>상품 소개</p>
        <p>{product.description}</p>
        <p>상품 태그</p>
        <p>{product.tags.map((tag) => `#${tag}`)}</p>
      </div>
      <div></div>
    </>
  );
}

export default ProductDetail;
