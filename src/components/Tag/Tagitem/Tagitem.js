import XImg from "../../../assets/X.svg";
import "./Tagitem.css";

function Tagitem({ item, onDelete, isDelete }) {
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="Tagitem">
      <span>#{item.value}</span>
      <button className="Tagitem-button">
        {isDelete && (
          <img
            src={XImg}
            alt="취소"
            width="20"
            height="20"
            onClick={handleDeleteClick}
          />
        )}
      </button>
    </div>
  );
}

export default Tagitem;
