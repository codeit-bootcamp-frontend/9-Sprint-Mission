import { useParams } from "react-router-dom";
import { getProductById } from "../api/Api";
import { useEffect, useState } from "react";
import heart from "../assets/ic_heart.svg";
import styled from "styled-components";
import Inquiry from "../components/Inquiry";
import Button from "../components/Button";
import PrevButton from "../components/PrevButton";
import InquiryBoard from "../components/InquiryBoard";
import user from "../assets/Frame 2609463.png";
import { Link } from "react-router-dom";
import { Kebab } from "../components/InquiryBoard";

const ProductInfoWrap = styled.div`
  display: flex;
  gap: 24px;
  padding-bottom: 40px;
  margin-bottom: 40px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 1190px;
    border-bottom: 1px solid #e5e7eb;
  }

  .product-img {
    width: 486px;
    height: 486px;
    border-radius: 16px;
  }

  @media only screen and (max-width: 1200px) {
  .product-img {
    width: 340px;
    height: 340px;
  }

  @media only screen and (max-width: 768px) {

  flex-direction:column;
  
  .product-img {
    width: 343px;
    height: 343px;
  }
  }

`;

const ProductInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  ${Kebab} {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const TitleSection = styled.div`
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: #1f2937;
    margin: 0 0 16px;

    span {
      display: block;
      margin: 16px 0 16px;
      font-size: 40px;
      line-height: 47.73px;
      color: #1f2937;
    }
  }
`;

const DescriptionSection = styled.div`
  margin-bottom: 62px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: #4b5563;
    margin: 0 0 16px;
  }
  p {
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: #4b5563;
    margin-bottom: 24px;
  }
  ul {
    display: flex;
    gap: 8px;
    padding: 0;
    li {
      list-style: none;
      padding: 6px 16px;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      color: #1f2937;
      background-color: #f3f4f6;
      border-radius: 26px;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    gap: 8px;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  button {
    cursor: pointer;
    width: 100px;
    height: 40px;
    border: 1px solid #e5e7eb;
    border-radius: 35px;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    color: #6b7280;
    padding-left: 34px;
    background-image: url(${heart});
    background-repeat: no-repeat;
    background-size: 32px 32px;
    background-position: 20% 50%;
    background-color: transparent;
  }

  .user-nickname {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: #4b5563;

    span {
      display: block;
      &:nth-child(2) {
        color: #9ca3af;
      }
    }
  }
`;

const InquirySection = styled.div`
  display: flex;
  flex-direction: column;

  .button-box {
    margin: 16px 0 24px;
    display: flex;
    justify-content: flex-end;
  }

  .back-btn {
    display: flex;
    justify-content: center;
  }
`;

interface Product {
  id: number;
  description: string;
  favoriteCount: number;
  name: string;
  price: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  images: string[0];
}
function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const getProduct = async (id: number) => {
    const data = await getProductById(id); // id로 받아온 data
    setProduct(data);
  };

  useEffect(() => {
    getProduct(Number(productId));
  }, [productId]);

  return (
    <>
      <ProductInfoWrap>
        <img
          className="product-img"
          src={product?.images}
          alt={product?.name}
        />
        <ProductInfo>
          <Kebab />
          <div>
            <TitleSection>
              <h2>
                {product?.name}
                <span>
                  {product?.price && (+product.price).toLocaleString()}원
                </span>
              </h2>
            </TitleSection>
            <DescriptionSection>
              <h3>상품소개</h3>
              <p>{product?.description}</p>
              <h3>상품태그</h3>
              <ul>
                {product?.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            </DescriptionSection>
          </div>
          <UserInfo>
            <div>
              <img src={user} alt="사용자 이미지" />
              <div className="user-nickname">
                <span>총명한판다</span>
                <span>2024.01.02</span>
              </div>
            </div>
            <button type="button">{product && product.favoriteCount}</button>
          </UserInfo>
        </ProductInfo>
      </ProductInfoWrap>
      <InquirySection>
        <Inquiry />
        <div className="button-box">
          <Button>등록</Button>
        </div>
        <InquiryBoard />
        <div className="back-btn">
          <Link to="/items">
            <PrevButton type="button">목록으로 돌아가기</PrevButton>
          </Link>
        </div>
      </InquirySection>
    </>
  );
}

export default ProductPage;
