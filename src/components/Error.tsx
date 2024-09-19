import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const navigate = useNavigate();
  const handleMoveMain = () => {
    navigate("/");
  }

  return (
    <div className="errorContainer">
      <div className="errorHeader">
        <img src="/icons/error.png" alt="에러" />
        <h2>오류가 발생했습니다. 아래를 확인해주세요.</h2>
      </div>
      <div className="errorContentsBox">
        <ul className="errorContentsList">
          <li>입력하신 경로가 잘못됐을 수 있으니 확인해주세요.</li>
          <li>알 수 없는 오류가 발생하여 이 페이지가 보일 수 있어요.</li>
        </ul>
      </div>
      <button onClick={handleMoveMain} className="toMainBtn">메인으로 돌아가기</button>
    </div>
  )
}

export default Error;