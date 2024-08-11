import React from "react";
import "./Product.css";
import { FaRegHeart } from "react-icons/fa";

export default function Product({ props }) {
  const { images, name, price, favoriteCount } = props;

  return (
    <div className='product-item'>
      <img className='product-image' src={images[0]} alt='상품 이미지' />
      <p>{name}</p>
      <p className='price'>{price}</p>
      <p>
        <FaRegHeart className='icon' />
        {favoriteCount}
      </p>
    </div>
  );
}
