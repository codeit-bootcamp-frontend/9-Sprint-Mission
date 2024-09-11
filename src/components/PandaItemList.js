// import { useState } from 'react';
import { NavLink } from "react-router-dom";
import heartIcon from "../img/ic_heart.png";

function PandaItem({ item }) {
  return (
    <a href="/" className="panda-item">
      <div className="img-box">
        <img
          className="product-img"
          src={item.images}
          alt="이미지"
          width="220"
          height="220"
        />
      </div>
      <div className="item-description">
        <b className="item-name">{item.name}</b>
        <strong className="item-price">{item.price.toLocaleString()}원</strong>
        <div className="favorite-count">
          <img src={heartIcon} alt="하트" width="16" height="16" />
          <p className="favorite-count">{item.favoriteCount}</p>
        </div>
      </div>
    </a>
  );
}

function PandaItemList({ items }) {
  return (
    <>
    <ul>
      {items.map((item) => {
        return (
          <NavLink to={`/items/${item.id}`} key={item.id}>
            <li key={item.id}>
              <PandaItem item={item} />
            </li>
          </NavLink>
        );
      })}
    </ul>
    </>
  );
}

export { PandaItem, PandaItemList };
