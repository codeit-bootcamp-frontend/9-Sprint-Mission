import ProductDetails from "./ProductDetails";
import CommentList from "./CommentList";
import { Container } from "../../../styles/Container";
import styled from "styled-components";
import Button from "../../../components/Button";
import arrowImg from "../../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/types";

interface ProductDetailsProps {
  datas: Product;
  id: number | string;
}

const ItemDetailPage = ({ datas, id }: ProductDetailsProps) => {
  const nav = useNavigate();
  return (
    <>
      <StyledProductDetails>
        <ProductDetails datas={datas} />
        <CommentList id={Number(id)} />
        <ReturnButtonContainer>
          <ReturnButton
            onClick={() => nav(-1)}
            width="240"
            height="48"
            radius="40"
          >
            <span>목록으로 돌아가기</span>
            <img src={arrowImg} alt="" width="24" height="24" />
          </ReturnButton>
        </ReturnButtonContainer>
      </StyledProductDetails>
    </>
  );
};

export default ItemDetailPage;

const StyledProductDetails = styled(Container)`
  padding: 24px 0 222px;

  @media (max-width: 1200px) {
    padding: 24px 0 243px;
  }

  @media (max-width: 768px) {
    padding: 16px 0 65px;
  }
`;

const ReturnButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ReturnButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
