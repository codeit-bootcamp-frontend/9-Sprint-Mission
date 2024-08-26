import arrowImg from "../../assets/arrow.svg";
import "./ReturnButton.css";
import { useNavigate } from "react-router-dom";

function ReturnButton() {
  const nav = useNavigate();
  return (
    <div className="button-section">
      <button onClick={() => nav(-1)} className="return-button">
        <span>목록으로 돌아가기</span>
        <img src={arrowImg} alt="" width="24" height="24" />
      </button>
    </div>
  );
}

export default ReturnButton;
