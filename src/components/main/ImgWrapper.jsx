import { Link } from "react-router-dom";
import "./ImgWrapper.css";

const ImgWrapper = () => {
  return (
    <div className="wrapperContents">
      <div className="wrapperInner">
        <div className="innerLeft">
          <h1>일상의 모든 물건을 거래해 보세요</h1>
          <Link to="/items">구경하러 가기</Link>
        </div>
        <div className="innerRight">
          <img src="/images/Img_home_top.svg" alt="상단 이미지" />
        </div>
      </div>
    </div>
  );
};

export default ImgWrapper;
