import React from "react";
import S from "./ItemCard.styles";
import { ReactComponent as HeartIcon } from "../../../../assets/images/icons/ic_heart.svg";

function ItemCard({ item, onClick }) {
  return (
    <S.Container onClick={onClick}>
      <S.itemCardThumbnail src={item.images[0]} alt={item.name} />
      <S.ItemSummary>
        <S.ItemName>{item.name}</S.ItemName>
        <S.ItemPrice>{item.price.toLocaleString()}원</S.ItemPrice>
        <S.FavoriteCount>
          <HeartIcon />
          {item.favoriteCount}
        </S.FavoriteCount>
      </S.ItemSummary>
    </S.Container>
  );
}

export default ItemCard;
