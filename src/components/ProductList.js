import "./ProductList.css";
import "./reset.css";
import heart from "../image/heart.png";

function formatPrice(value) {
  return `${value.toLocaleString()}원`;
}

function ProductListItem({ item }) {
  return (
    <div>
      <img
        className="item-image"
        src={item.images}
        alt={item.name}
        width={221}
        height={221}
      />
      <div className="item-description">
        <strong className="item-name">{item.name}</strong>
        <em className="item-price">{formatPrice(item.price)}</em>
        <em className="item-like">
          <img
            className="item-like-img"
            src={heart}
            alt="좋아요"
            width={16}
            height={16}
          />
          {item.favoriteCount}
        </em>
      </div>
    </div>
  );
}

function ProductList({ items, className }) {
  return (
    <ul className={className}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ProductListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ProductList;
