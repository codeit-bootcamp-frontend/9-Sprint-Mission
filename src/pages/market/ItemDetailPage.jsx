import { useParams } from "react-router-dom";
import ItemDetailSection from "../../entities/item/ui/item-detail";
import CommentsSection from "../../entities/comment/ui/comments";
import useProductDetail from "../../entities/item/lib/useProductDetail";
import "./ItemDetailPage.css";

function ItemDetailPage() {
  const { productId } = useParams();
  const { itemDetail } = useProductDetail(productId);

  return (
    <div className="wrapper">
      {itemDetail ? (
        <>
          <ItemDetailSection itemDetail={itemDetail} />
          <CommentsSection productId={itemDetail.id} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ItemDetailPage;
