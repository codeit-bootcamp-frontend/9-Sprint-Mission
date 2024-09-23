import styled from "styled-components";
import FavoriteEmptyImg from "../../../assets/images/icon/empty_heart.svg";
import FavoriteFillImg from "../../../assets/images/icon/filled_heart.svg";
import { useState } from "react";

interface Props {
  favoriteCount: number;
}

const FavoriteCount = ({ favoriteCount }: Props) => {
  const [favorite, setFavorite] = useState(false);

  const handleClick = () => {
    setFavorite((prefavorite) => !prefavorite);
  };

  return (
    <FavoriteButton onClick={handleClick}>
      <img src={favorite ? FavoriteFillImg : FavoriteEmptyImg} alt="favorite" />
      {favorite ? favoriteCount + 1 : favoriteCount}
    </FavoriteButton>
  );
};

export default FavoriteCount;

const FavoriteButton = styled.button`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 4px 12px;
  gap: 10px;
  border-radius: 35px;
  border: 1px solid #e5e7eb;
  background-color: transparent;
  font-size: 1.6rem;
  font-weight: 500;
  color: #6b7280;
  position: relative;

  img {
    width: 26px;
  }

  &:after {
    position: absolute;
    left: -3rem;
    content: "";
    width: 1px;
    height: 34px;
    background-color: #e5e7eb;
  }
`;
