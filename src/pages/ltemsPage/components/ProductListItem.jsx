import formatPrice from "../../../utils/formatPrice";
import defaultImg from "../../../assets/default.svg";
import styled from "styled-components";
import {
  ProductDescription,
  ProductPrice,
  ProductLike,
} from "../../../utils/constants";

function ProductListItem({ product }) {
  return (
    <>
      <ProductImg src={product.images[0] || defaultImg} alt={product.name} />
      <ProductDescription>{product.description}</ProductDescription>
      <ProductPrice>{formatPrice(product.price)}원</ProductPrice>
      <ProductLike>♡ {product.favoriteCount}</ProductLike>
    </>
  );
}

export default ProductListItem;

const ProductImg = styled.img`
  width: 221px;
  height: 221px;
  border-radius: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    width: 168px;
    height: 168px;
  }
`;
