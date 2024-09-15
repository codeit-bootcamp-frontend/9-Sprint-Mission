import { useRef } from "react";
import styled from "styled-components";
import formatPrice from "../../../utils/formatPrice";
import Profile from "./Profile";
import profileImg from "../../../assets/profile.svg";
import heartImg from "../../../assets/heart.svg";
import defaultImg from "../../../assets/default.svg";
import DropDownImg from "../../../components/DropDownImg";

function ProductDetails({ datas }) {
  const idRef = useRef(0);
  const { images, name, price, description, tags = [] } = datas;
  return (
    <ProductContainer>
      <ProductImage src={images || defaultImg} alt="상품이미지" />
      <ProductInfo>
        <ProductInfoContent>
          <ProductInfoHeader>
            <ProductInfoName>{name}</ProductInfoName>
            <DropDownImg />
          </ProductInfoHeader>
          <ProductInfoPrice>{formatPrice(price)}원</ProductInfoPrice>
        </ProductInfoContent>

        <ProductInfoDescription>
          <ProductInfoSmallTitle>상품소개</ProductInfoSmallTitle>
          <p>{description}</p>
        </ProductInfoDescription>

        <ProductTagContainer>
          <ProductInfoSmallTitle>상품 태그</ProductInfoSmallTitle>
          {tags.length !== 0 && (
            <ProductInfoTags>
              {tags.map((item) => (
                <ProductInfoTag key={idRef.current++}>#{item}</ProductInfoTag>
              ))}
            </ProductInfoTags>
          )}
        </ProductTagContainer>

        <ProductProfileSection>
          <Profile src={profileImg} nickname="총명한 판다" createdAt={true} />
          <ProductProfileButton>
            <img src={heartImg} alt="하트" width="32" height="32" />
            <span>123</span>
          </ProductProfileButton>
        </ProductProfileSection>
      </ProductInfo>
    </ProductContainer>
  );
}

export default ProductDetails;

const ProductContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0 40px;
  border-bottom: 1px solid #e5e7eb;
  justify-content: center;
  width: 100%;

  @media (max-width: 1200px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-bottom: 24px;
  }
`;

const ProductImage = styled.img`
  border-radius: 16px;
  width: 486px;
  height: 486px;

  @media (max-width: 1200px) {
    width: 340px;
    height: 340px;
  }
`;

const ProductInfo = styled.div`
  width: 690px;

  @media (max-width: 1200px) {
    width: 340px;
  }
`;

const ProductInfoContent = styled.div`
  color: #1f2937;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
  padding-bottom: 16px;
`;

const ProductInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductInfoName = styled.h4`
  font-size: 24px;
  margin: 0;
`;

const ProductInfoPrice = styled.h2`
  font-size: 40px;
  margin-top: 16px;
  margin-bottom: 0;
`;

const ProductInfoDescription = styled.div`
  margin-bottom: 24px;
  font-size: 16px;
  color: #4b5563;

  p {
    font-weight: 400;
    margin-top: 16px;
    margin-bottom: 0;
  }

  @media (max-width: 1200px) {
    p {
      color: #1f2937;
    }
  }
`;

const ProductInfoSmallTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #4b5563;
`;

const ProductTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 62px;
`;

const ProductInfoTags = styled.ul`
  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const ProductInfoTag = styled.li`
  padding: 6px 16px;
  background-color: #f3f4f6;
  border-radius: 26px;
`;

const ProductProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 62px;
`;

const ProductProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 35px;
  background-color: #fff;
  padding: 4px 12px;
  cursor: pointer;
`;
