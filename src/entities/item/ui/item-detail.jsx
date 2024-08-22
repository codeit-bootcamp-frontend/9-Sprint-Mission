import { useState } from "react";
import KebabIcon from "../../../shared/assets/images/icons/ic_kebab.svg";
import ProfileIcon from "../../../shared/assets/images/icons/ic_profile.svg";
import HeartIcon from "../../../shared/assets/images/icons/ic_heart.svg";
import HeartOnIcon from "../../../shared/assets/images/icons/ic_heart_on.svg";

function ItemDetailSection({ itemDetail }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="item-detail">
      <div className="product-image">
        <img src={itemDetail.images[0]} alt={itemDetail.name} />
      </div>
      <div className="product-info">
        <div className="product-header">
          <div className="product-name">{itemDetail.name}</div>
          <div className="kebab-icon-container" onClick={toggleDropdown}>
            <KebabIcon alt="item detail options" className="kebab-icon" />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">
                  수정하기
                </a>
                <a href="#" className="dropdown-item">
                  삭제하기
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="product-price">
          {itemDetail.price.toLocaleString()}원
        </div>
        <div className="product-description-container">
          <div className="product-menu">상품소개</div>
          <div className="product-description">{itemDetail.description}</div>
        </div>
      </div>
      <div className="product-tags-container">
        <div className="product-menu">상품태그</div>
        <div className="product-tags">
          {itemDetail.tags?.map((tag, i) => (
            <span key={`tag-${i}`} className="product-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="writer-info">
        <ProfileIcon className="profile-icon" alt="profile" />
        <div className="writer-details">
          <div className="writer-name">총명한판다</div>
          <div className="date">2024.08.22</div>
        </div>
        <div className="likes">
          <button className="like-button" onClick={toggleLike}>
            {liked ? (
              <HeartOnIcon className="heart-icon" alt="liked" />
            ) : (
              <HeartIcon className="heart-icon" alt="unliked" />
            )}
          </button>
          <span>{liked ? 124 : 123}</span>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailSection;
