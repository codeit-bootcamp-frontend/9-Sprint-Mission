import { Link } from "react-router-dom";
import { ReactComponent as HeartItem } from "../../../shared/assets/images/icons/ic_heart.svg";
import { ItemCardProps } from "../types/item-card-props";

function ItemCard({ item }: ItemCardProps) {
  return (
    <Link to={`/items/${item.id}`} className="itemCard">
      <img src={item.images[0]} alt={item.name} className="itemCardThumbnail" />
      <div className="itemSummary">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartItem />
          {item.favoriteCount}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
