import first from "../image/first.png";
import second from "../image/second.png";
import third from "../image/third.png";
import fourth from "../image/fourth.png";
import fifth from "../image/fifth.png";
import back from "../image/back.png";
import front from "../image/front.png";
import "./PagiNation.css";

function PagiNation({ onPageChange }) {
  return (
    <>
      <button className="pagination-button" onClick={() => onPageChange()}>
        <img src={back} alt="back" width={40} height={40} />
      </button>

      <button className="pagination-button" onClick={() => onPageChange(1)}>
        <img src={first} alt="1" width={40} height={40} />
      </button>

      <button className="pagination-button" onClick={() => onPageChange(2)}>
        <img src={second} alt="2" width={40} height={40} />
      </button>

      <button className="pagination-button" onClick={() => onPageChange(3)}>
        <img src={third} alt="3" width={40} height={40} />
      </button>

      <button className="pagination-button" onClick={() => onPageChange(4)}>
        <img src={fourth} alt="4" width={40} height={40} />
      </button>

      <button className="pagination-button" onClick={() => onPageChange(5)}>
        <img src={fifth} alt="5" width={40} height={40} />
      </button>

      <button className="pagination-button" onClick={() => onPageChange()}>
        <img src={front} alt="front" width={40} height={40} />
      </button>
    </>
  );
}

export default PagiNation;
