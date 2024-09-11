import { Link, useParams } from "react-router-dom";
import ItemDetailSection from "../../entities/item/ui/item-detail";
import CommentsSection from "../../entities/comment/ui/comments";
import useProductDetail from "../../entities/item/lib/useProductDetail";
import BackButtonIcon from "../../shared/assets/images/icons/ic_back.svg";
import "./ItemDetailPage.css";

function ItemDetailPage() {
  const { productId } = useParams<{ productId: string }>(); // productId가 문자열임을 명시적으로 선언

  // productId가 undefined가 아닌 경우 숫자로 변환, 아니면 0 처리
  const productIdNumber = productId ? parseInt(productId, 10) : 0;

  // productIdNumber가 숫자일 경우에만 useProductDetail 호출
  const { itemDetail } = useProductDetail(productIdNumber);

  return (
    <div className="item-detail-comment-wrapper">
      {itemDetail ? (
        <>
          <ItemDetailSection itemDetail={itemDetail} />
          <div className="area-line"></div>
          <CommentsSection productId={itemDetail.id} />
          <div className="back-button-area">
            <Link to="/items" className="back-button-text">
              <span>목록으로 돌아가기</span>
              <img src={BackButtonIcon} alt="back to list" />
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
