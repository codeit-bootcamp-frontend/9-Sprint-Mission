import { Link, useParams } from "react-router-dom";
import ItemDetailSection from "../../entities/item/ui/item-detail";
import CommentsSection from "../../entities/comment/ui/comments";
import useProductDetail from "../../entities/item/lib/useProductDetail";
import BackButtonIcon from "../../shared/assets/images/icons/ic_back.svg";
import "./ItemDetailPage.css";

function ItemDetailPage() {
  const { productId } = useParams();
  const { itemDetail } = useProductDetail(productId);

  return (
    <div className="item-detail-wrapper">
      {itemDetail ? (
        <>
          <ItemDetailSection itemDetail={itemDetail} />
          <div className="area-line"></div>
          <CommentsSection productId={itemDetail.id} />
          <div className="back-button-area">
            <Link to="/items" className="back-button-text">
              <span>목록으로 돌아가기</span>
              <BackButtonIcon />
            </Link>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ItemDetailPage;
