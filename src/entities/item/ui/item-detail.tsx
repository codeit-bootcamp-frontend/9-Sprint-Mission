import { useState } from "react";
import DropdownMenu from "@shared/ui/dropdown-menu";
import KebabIcon from "@images/icons/ic_kebab.svg";
import ProfileIcon from "@images/icons/ic_profile.svg";
import HeartIcon from "@images/icons/ic_heart.svg";
import HeartOnIcon from "@images/icons/ic_heart_on.svg";
import { ItemDetailProps } from "../types/item-detail-props.types";

function ItemDetailSection({ itemDetail }: ItemDetailProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleDropdownItemClick = (item: {
    label: string;
    action: () => void;
  }) => {
    if (item.action) {
      item.action();
    }
    setDropdownVisible(false);
  };

  const dropdownItems = [
    { label: "수정하기", action: () => console.log("Edit clicked") },
    { label: "삭제하기", action: () => console.log("Delete clicked") },
  ];

  return (
    <div className="item-detail">
      <div className="product-image">
        <img src={itemDetail.images[0]} alt={itemDetail.name} />
      </div>
      <div className="product-info">
        <div className="product-header">
          <div className="product-name">{itemDetail.name}</div>
          <div className="kebab-icon-container" onClick={toggleDropdown}>
            <img src={KebabIcon} className="kebab-icon" alt="Kebab" />
            {dropdownVisible && (
              <DropdownMenu
                items={dropdownItems}
                onItemClick={handleDropdownItemClick}
              />
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
          <img src={ProfileIcon} className="profile-icon" alt="Profile" />
          <div className="writer-details">
            <div className="writer-name">총명한판다</div>
            <div className="date">2024.08.22</div>
          </div>
          <div className="likes">
            <button className="like-button" onClick={toggleLike}>
              {liked ? (
                <img src={HeartOnIcon} className="heart-icon" alt="Heart On" />
              ) : (
                <img src={HeartIcon} className="heart-icon" alt="Heart Off" />
              )}
            </button>
            <span>
              {liked ? itemDetail.favoriteCount + 1 : itemDetail.favoriteCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailSection;
