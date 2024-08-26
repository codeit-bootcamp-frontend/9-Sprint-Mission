import { useNavigate } from "react-router-dom";

function AllItems({ data }) {
  let navigate = useNavigate();
  return (
    <div className="item-container">
      {data.list.map((item) => {
        return (
          <div key={item.id}>
            <img
              src={item.images}
              alt="item-images"
              className="itemImage"
              onClick={() => {
                navigate(`/items/${item.id}`);
              }}
            />
            <div className="item-detail">
              <p> {item.name}</p>
              <p className="item-price">{item.price}원 </p>
              <p className="item-like"> 🤍 {item.favoriteCount}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllItems;
