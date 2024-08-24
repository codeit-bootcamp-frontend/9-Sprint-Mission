import "./ItemViewer.css";
import { useRef } from "react";
import formatPrice from "../../utils/formatPrice";
import Profile from "../Profile/Profile";
import profileImg from "../../assets/profile.svg";
import heartImg from "../../assets/heart.svg";
import dropdownImg from "../../assets/dropdown.svg";

function ItemViewer({ viewer }) {
  const idRef = useRef(0);

  const { images, name, price, description, tags = [] } = viewer;
  return (
    <div className="viewer">
      <img
        className="viewer-image"
        src={images}
        alt="상품이미지"
        width="486"
        height="486"
      />
      <div className="viewer-info">
        <div className="viewer-info-content">
          <div className="viewer-info-header">
            <h4 className="viewer-info-name">{name}</h4>
            <img src={dropdownImg} alt="드롭다운" width="24" height="24" />
          </div>
          <h2 className="viewer-info-price">{formatPrice(price)}원</h2>
        </div>
        <div className="viewer-info-description">
          <span className="viewer-info-small-title">상품소개</span>
          <p>{description}</p>
        </div>
        <div className="viewer-info-tag-section">
          <span className="viewer-info-small-title">상품 태그</span>
          {tags.length !== 0 && (
            <ul className="viewer-info-tags">
              {tags.map((item) => (
                <li className="viewer-info-tag" key={idRef.current++}>
                  #{item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="viewer-profile-section">
          <Profile src={profileImg} nickname="총명한 판다" createdAt={true} />
          <button className="viewer-profile-button">
            <img src={heartImg} alt="하트" width="32" height="32" />
            <div>123</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemViewer;
