import React, { useState } from "react";
import "./DropdownMenu.css";
import { ReactComponent as SortIcon } from "../../assets/images/icons/ic_sort.svg";

function DropdownMenu({ onSortSelection }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="sortButtonWrapper">
      
      {/* <div className={styles.dropdown}>
        <button value="recent" onClick={onSelect} className={styles.element}>
          최신순
        </button>
        <button value="favorite" onClick={onSelect} className={styles.element}>
          좋아요순
        </button>
      </div> */}

      <button className="sortDropdownTriggerButton" onClick={toggleDropdown}>
        <SortIcon />
      </button>

      {isDropdownVisible && (
        <div className="dropdownMenu">
          <div
            className="dropdownItem"
            onClick={() => {
              onSortSelection("recent");
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </div>
          <div
            className="dropdownItem"
            onClick={() => {
              onSortSelection("favorite");
              setIsDropdownVisible(false);
            }}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
}
export default DropdownMenu;
