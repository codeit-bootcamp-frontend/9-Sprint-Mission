// ItemDetailSection.tsx
import { useState } from "react";
import styled from "styled-components";
import DropdownMenu from "../../../shared/ui/dropdown-menu";
import { formatDate } from "../../../shared/lib/dateFormatter";
import { ReactComponent as KebabIcon } from "../../../shared/assets/images/icons/ic_kebab.svg";
import { ReactComponent as ProfileIcon } from "../../../shared/assets/images/icons/ic_profile.svg";
import { ReactComponent as HeartIcon } from "../../../shared/assets/images/icons/ic_heart.svg";
import { ReactComponent as HeartOnIcon } from "../../../shared/assets/images/icons/ic_heart_on.svg";
import { ProductDetail } from "../types/product";

// Styled Components
const ItemDetailWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-top: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 16px;

  /* Tablet & Desktop layout */
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 24px;
    align-items: stretch; /* 이미지와 정보 섹션의 높이를 동일하게 */
  }
`;

const ProductImage = styled.div`
  img {
    width: 100%;
    max-width: 343px;
    max-height: 343px;
    border-radius: 12px;
  }

  /* Tablet */
  @media (min-width: 768px) {
    img {
      max-width: 340px;
      max-height: 340px;
    }
  }

  /* Desktop */
  @media (min-width: 1200px) {
    img {
      max-width: 486px;
      max-height: 486px;
    }
  }
`;

const ProductInfo = styled.div`
  font-family: Arial, sans-serif;
  color: var(--gray-800);
  flex: 1; /* Image와 나란히 배치될 공간 차지 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 콘텐츠가 균등하게 배치되도록 */
  flex-grow: 1; /* ProductImage와 동일한 높이로 확장 */

  /* Desktop에서는 여백 추가 */
  @media (min-width: 1200px) {
    padding-left: 24px;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
`;

const ProductName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: var(--gray-800);
  line-height: 32px;
  margin-bottom: 8px;
`;

// DropdownMenu를 담을 컨테이너가 제대로 표시되도록 수정
const DropdownIconWrapper = styled.div`
  position: relative; /* DropdownMenu가 기준할 부모 요소 */
  cursor: pointer;
`;

const ProductPrice = styled.div`
  font-size: 40px;
  color: var(--gray-800);
  font-weight: bold;
  line-height: 48px;
  margin-bottom: 16px;
`;

const ProductDescriptionContainer = styled.div`
  margin-bottom: 24px;
`;

const ProductMenu = styled.div`
  color: var(--gray-600);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const ProductDescription = styled.div`
  margin-top: 12px;
  font-size: 16px;
  line-height: 1.75;
  color: var(--gray-600);
`;

const ProductTagsContainer = styled.div`
  margin-bottom: 40px;
`;

const ProductTags = styled.div`
  margin-top: 12px;
`;

const ProductTag = styled.span`
  display: inline-block;
  background-color: var(--gray-100);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  color: var(--gray-800);
  margin-right: 8px;
  margin-bottom: 8px;
`;

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
`;

const WriterDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const WriterName = styled.div`
  font-weight: bold;
  color: var(--gray-600);
`;

const Date = styled.div`
  font-size: 12px;
  color: var(--gray-400);
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 32px;
  border-radius: 35px;
  border: 1px solid #ccc;
  padding: 4px;
  box-sizing: border-box;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LikeCount = styled.button`
  width: 27px;
  height: 26px;
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  color: var(--gray-500);
`;

function ItemDetailSection({
  productDetail,
}: {
  productDetail: ProductDetail; // productDetail 타입 명시
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleEditClick = (productId: number) => {
    console.log(`Edit clicked for productId: ${productId}`);
    setDropdownVisible(false);
  };

  const handleDeleteClick = (productId: number) => {
    console.log(`Delete clicked for productId: ${productId}`);
    setDropdownVisible(false);
  };
  return (
    <ItemDetailWrapper>
      <ProductImage>
        <img src={productDetail.images[0]} alt={productDetail.name} />
      </ProductImage>
      <ProductInfo>
        <ProductHeader>
          <ProductName>{productDetail.name}</ProductName>
          <DropdownIconWrapper>
            <div onClick={toggleDropdown}>
              <KebabIcon />
              {dropdownVisible && (
                <DropdownMenu>
                  <DropdownMenu.Item
                    label="수정하기"
                    onClick={() => handleEditClick(productDetail.id)}
                  />
                  <DropdownMenu.Item
                    label="삭제하기"
                    onClick={() => handleDeleteClick(productDetail.id)}
                  />
                </DropdownMenu>
              )}
            </div>
          </DropdownIconWrapper>
        </ProductHeader>
        <ProductPrice>{productDetail.price.toLocaleString()}원</ProductPrice>
        <ProductDescriptionContainer>
          <ProductMenu>상품소개</ProductMenu>
          <ProductDescription>{productDetail.description}</ProductDescription>
        </ProductDescriptionContainer>
        <ProductTagsContainer>
          <ProductMenu>상품태그</ProductMenu>
          <ProductTags>
            {productDetail.tags?.map((tag: string, i: number) => (
              <ProductTag key={`tag-${i}`}>#{tag}</ProductTag>
            ))}
          </ProductTags>
        </ProductTagsContainer>
        <WriterInfo>
          <ProfileIcon />
          <WriterDetails>
            <WriterName>총명한판다</WriterName>
            <Date>{formatDate(productDetail.createdAt)}</Date>
          </WriterDetails>
          <Likes>
            <LikeButton onClick={toggleLike}>
              {liked ? <HeartOnIcon /> : <HeartIcon />}
            </LikeButton>
            <LikeCount>
              {liked
                ? productDetail.favoriteCount + 1
                : productDetail.favoriteCount}
            </LikeCount>
          </Likes>
        </WriterInfo>
      </ProductInfo>
    </ItemDetailWrapper>
  );
}

export default ItemDetailSection;
