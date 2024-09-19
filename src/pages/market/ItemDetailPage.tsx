// ItemDetailPage.tsx
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ItemDetailSection from "../../entities/item/ui/item-detail";
import CommentsSection from "../../shared/ui/comments";
import useProductDetail from "../../entities/item/lib/useProductDetail";
import { ReactComponent as BackButtonIcon } from "../../shared/assets/images/icons/ic_back.svg";
import { COMMENT_TYPE } from "../../shared/types/comment-type";

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AreaLine = styled.div`
  min-width: 375px;
  width: 98%;
  border-width: 1px;
  border-style: solid;
  border-color: var(--gray-200);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 6px;
`;

const BackButtonArea = styled.div`
  min-width: 375px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

const BackButtonText = styled(Link)`
  width: 240px;
  height: 48px;
  color: var(--gray-100);
  background-color: var(--blue-100);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

function ItemDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  const productIdNumber: number = productId ? parseInt(productId, 10) : 0;

  const { productDetail } = useProductDetail(productIdNumber);

  const commentType = COMMENT_TYPE.product;

  return (
    <Wrapper>
      {productDetail ? (
        <>
          <ItemDetailSection productDetail={productDetail} />
          <AreaLine />
          <CommentsSection id={productIdNumber} type={commentType} />
          <BackButtonArea>
            <BackButtonText to="/items">
              <span>목록으로 돌아가기</span>
              <BackButtonIcon title="Back to list page" />
            </BackButtonText>
          </BackButtonArea>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
}

export default ItemDetailPage;
