import "../Productlist.css";
import { Item } from "../../../types/Product";

// ItemBoxProps 타입 정의
interface ItemBoxProps {
  item: Item;
}

const ItemBox: React.FC<ItemBoxProps> = ({ item }) => {
  return (
    <div className="item-box">
      <div className="prd-img">
        <img src={item.images[0]} alt={item.name} />
      </div>
      <div className="prd-info">
        <p className="prd-name">{item.name}</p>
        <p className="prd-price">{item.price}원</p>
        <p className="prd-like">{item.favoriteCount}</p>
      </div>
    </div>
  );
};

export default ItemBox;
