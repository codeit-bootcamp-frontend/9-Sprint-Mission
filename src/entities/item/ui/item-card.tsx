import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as HeartItem } from "../../../shared/assets/images/icons/ic_heart.svg";
import { ItemCardProps } from "../types/item-card-props";

// Styled Components
const ItemCardWrapper = styled(Link)`
  color: #1f2937;
  overflow: hidden;
  cursor: pointer;
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

const ItemSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
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

function ItemCard({ item }: ItemCardProps) {
  return (
    <ItemCardWrapper to={`/items/${item.id}`}>
      <ItemCardThumbnail src={item.images[0]} alt={item.name} />
      <ItemSummary>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
        <FavoriteCount>
          <HeartItem />
          {item.favoriteCount}
        </FavoriteCount>
      </ItemSummary>
    </ItemCardWrapper>
  );
}

export default ItemCard;
