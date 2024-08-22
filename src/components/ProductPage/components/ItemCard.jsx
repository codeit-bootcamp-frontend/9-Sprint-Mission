import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { images, name, price, favoriteCount, id } = item;

  return (
    <li>
      <Link to={`/items/${id}`} className="product-box">
        <div className="img-box">
          <img src={images[0]} alt={name} />
        </div>
        <p className="txt">{name}</p>
        <h3 className="price">{price}원</h3>
        <div className="heart-wrap">
          <button className="heart-button" type="button"></button>
          <p className="count">{favoriteCount}</p>
        </div>
      </Link>
    </li>
  );
};

export default ItemCard;
