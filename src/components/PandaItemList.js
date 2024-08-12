// import { useState } from 'react';
import heartIcon from "../img/ic_heart.png";

function PandaItem({ item }) {
  return (
    <div className="panda-item">
      <img
        className="product-img"
        src={item.images}
        alt="제품 이미지"
        width="220"
        height="220"
      />
      <div className="item-description">
        <p className="item-name">{item.name}</p>
        <strong className="item-price">{item.price.toLocaleString()}원</strong>
        <div className="favorite-count">
          <img src={heartIcon} alt="하트" width="16" height="16" />
          <p className="favorite-count">{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

function PandaItemList({ items }) {
  return (
    <ul className>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <PandaItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export { PandaItem, PandaItemList };
