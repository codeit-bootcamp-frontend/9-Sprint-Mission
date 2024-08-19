import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetailSection from "../../entities/item/ui/item-detail";
import CommentsSection from "../../entities/comment/ui/comments";
import { getProductDetail } from "../../shared/api/items/items";
import "./ItemDetailPage.css";

function ItemDetailPage() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setError("상품 아이디가 제공되지 않았어요.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getProductDetail(productId);
        if (!data) {
          throw new Error("해당 상품의 데이터를 찾을 수 없습니다.");
        }
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      {product ? (
        <>
          <ItemDetailSection product={product} />
          <CommentsSection productId={productId} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ItemDetailPage;
