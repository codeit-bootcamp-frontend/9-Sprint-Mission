/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailPresenter from "./ProductDetail.presenter";
import { getProductDetail, getProductComment } from "../api"; // 상세 정보를 가져오는 API 함수

function ProductDetail() {
  const { id } = useParams(); // URL에서 제품 ID를 가져옴
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState([]);

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
        setComment(data.list);
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
  console.log(comment.id);

  return (
    <>
      <ProductDetailPresenter product={product} comment={comment} />
    </>
  );
}

export default ProductDetail;
