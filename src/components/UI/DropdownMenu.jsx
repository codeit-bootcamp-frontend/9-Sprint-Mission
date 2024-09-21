import React, { useState } from "react";
import { ReactComponent as SortIcon } from "../../assets/images/icons/ic_sort.svg";
import S from "./DropdownMenu.styles.jsx";

function DropdownMenu({ onSortSelection }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <S.SortButtonWrapper>
      {/* <div className={styles.dropdown}>
        <button value="recent" onClick={onSelect} className={styles.element}>
          최신순
        </button>
        <button value="favorite" onClick={onSelect} className={styles.element}>
          좋아요순
        </button>
      </div> */}

      <S.SortDropdownTriggerButton onClick={toggleDropdown}>
        <SortIcon />
      </S.SortDropdownTriggerButton>

      {isDropdownVisible && (
        <S.DropdownMenu>
          <S.DropdownItem
            onClick={() => {
              onSortSelection("recent");
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </S.DropdownItem>
          <S.DropdownItem
            onClick={() => {
              onSortSelection("favorite");
              setIsDropdownVisible(false);
            }}
          >
            인기순
          </S.DropdownItem>
        </S.DropdownMenu>
      )}
    </S.SortButtonWrapper>
  );
}
export default DropdownMenu;
