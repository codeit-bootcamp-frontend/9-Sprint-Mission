// ItemDetailSection.tsx
import { useState } from "react";
import styled from "styled-components";
import DropdownMenu from "../../../shared/ui/dropdown-menu";
import { ItemDetailProps } from "../types/item-detail-props";
import { ReactComponent as KebabIcon } from "../../../shared/assets/images/icons/ic_kebab.svg";
import { ReactComponent as ProfileIcon } from "../../../shared/assets/images/icons/ic_profile.svg";
import { ReactComponent as HeartIcon } from "../../../shared/assets/images/icons/ic_heart.svg";
import { ReactComponent as HeartOnIcon } from "../../../shared/assets/images/icons/ic_heart_on.svg";

// Styled Components
const ItemDetailWrapper = styled.div`
  max-width: 344px;
  width: 100%;
  margin-top: 16px;
  background-color: #ffffff;
  border-radius: 12px;
`;

const ProductImage = styled.div`
  img {
    width: 100%;
    max-width: 344px;
    max-height: 344px;
    border-radius: 12px;
  }
`;

const ProductInfo = styled.div`
  margin-top: 16px;
  font-family: Arial, sans-serif;
  color: var(--gray-800);
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProductName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--gray-800);
`;

const ProductPrice = styled.div`
  font-size: 24px;
  color: var(--gray-800);
  font-weight: bold;
`;

const ProductDescriptionContainer = styled.div`
  margin-bottom: 16px;
`;

const ProductMenu = styled.div`
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
`;

const ProductDescription = styled.div`
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.5;
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
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  color: var(--gray-800);
  margin-right: 4px;
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

const HeartIconStyled = styled(HeartIcon)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

function ItemDetailSection({ itemDetail }: ItemDetailProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleEditClick = () => {
    console.log("Edit clicked");
    setDropdownVisible(false);
  };

  const handleDeleteClick = () => {
    console.log("Delete clicked");
    setDropdownVisible(false);
  };

  return (
    <ItemDetailWrapper>
      <ProductImage>
        <img src={itemDetail.images[0]} alt={itemDetail.name} />
      </ProductImage>
      <ProductInfo>
        <ProductHeader>
          <ProductName>{itemDetail.name}</ProductName>
          <div onClick={toggleDropdown}>
            <KebabIcon />
            {dropdownVisible && (
              <DropdownMenu>
                <DropdownMenu.Item label="수정하기" onClick={handleEditClick} />
                <DropdownMenu.Item
                  label="삭제하기"
                  onClick={handleDeleteClick}
                />
              </DropdownMenu>
            )}
          </div>
        </ProductHeader>
        <ProductPrice>{itemDetail.price.toLocaleString()}원</ProductPrice>
        <ProductDescriptionContainer>
          <ProductMenu>상품소개</ProductMenu>
          <ProductDescription>{itemDetail.description}</ProductDescription>
        </ProductDescriptionContainer>
        <ProductTagsContainer>
          <ProductMenu>상품태그</ProductMenu>
          <ProductTags>
            {itemDetail.tags?.map((tag, i) => (
              <ProductTag key={`tag-${i}`}>#{tag}</ProductTag>
            ))}
          </ProductTags>
        </ProductTagsContainer>
        <WriterInfo>
          <ProfileIcon />
          <WriterDetails>
            <WriterName>총명한판다</WriterName>
            <Date>2024.08.22</Date>
          </WriterDetails>
          <Likes>
            <LikeButton onClick={toggleLike}>
              {liked ? <HeartOnIcon /> : <HeartIconStyled />}
            </LikeButton>
            <span>
              {liked ? itemDetail.favoriteCount + 1 : itemDetail.favoriteCount}
            </span>
          </Likes>
        </WriterInfo>
      </ProductInfo>
    </ItemDetailWrapper>
  );
}

export default ItemDetailSection;
