import XImg from "../../assets/X.svg";
import "./Tagitems.css";

function Tagitems({ item, onDelete }) {
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="Tagitems">
      <span>#{item.value}</span>
      <button className="Tagitems-button">
        <img
          src={XImg}
          alt="취소"
          width="20"
          height="20"
          onClick={handleDeleteClick}
        />
      </button>
    </div>
  );
}

export default Tagitems;
