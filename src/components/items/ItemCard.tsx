import HeartIcon from "@/assets/images/icons/ic_heart.svg";
import styled from "styled-components";
import Image from "next/image";

function ItemCard({ item }) {
  return (
    <Container>
      <ItemCardThumbnail src={item.images[0]} alt={item.name} />
      <ItemSummary>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
        <FavoriteCount>
          <Image src={HeartIcon} width={40} height={40} alt="heart icon" />
          {item.favoriteCount}
        </FavoriteCount>
      </ItemSummary>
    </Container>
  );
}

export default ItemCard;

// 스타일 컴포넌트 정의

const Container = styled.div`
  color: #1f2937;
  overflow: hidden;
  cursor: pointer;
`;

const ItemSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

const ItemCardThumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  margin-bottom: 16px;
`;

const ItemName = styled.h2`
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const FavoriteCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4b5563;
  font-size: 12px;
`;
