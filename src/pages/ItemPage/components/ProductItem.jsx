import React from "react";
import heartIcon from "../../../assets/icon/heart.svg";
import "./ProductItem.css";

const ProductItem = ({ item }) => {
    return (
        <div className="item">
            <img className="productImg" src={item.images} alt="상품 이미지" />
            <p className="name">{item.name}</p>
            <p className="price">{item.price}</p>
            <div className="favorite">
                <img className="favoriteIcon" src={heartIcon} alt="하트" />
                {item.favoriteCount}
            </div>
        </div>
    );
};

export default ProductItem;
