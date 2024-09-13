import { useEffect, useState } from "react";
import { getProductDetail } from "../api/items";
import { ProductDetail } from "../types/product"; // ProductDetail 타입 임포트

function useProductDetail(productId: number) {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  ); // 타입을 ProductDetail로 지정
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (productId === 0) return; // productId가 0일 경우 처리

    const fetchProductDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const responseInfo: ProductDetail = await getProductDetail(productId); // API 호출 결과를 ProductDetail 타입으로 지정
        setProductDetail(responseInfo);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("알 수 없는 오류가 발생했습니다"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { productDetail, loading, error };
}

export default useProductDetail;
