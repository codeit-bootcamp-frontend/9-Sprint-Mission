import { useState } from "react";
import { ArticleSortOption } from "@/types/article";
import Image from "next/image";
import SortIcon from "@/assets/images/icons/ic_sort.svg";
import styles from "./DropdownMenu.module.scss";

interface Props {
  onSortSelection: (sortOption: ArticleSortOption) => void;
}

const DropdownMenu = ({ onSortSelection }: Props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <section className={styles.dropdownMenu}>
      <button
        className={styles.sortDropdownTriggerButton}
        onClick={toggleDropdown}
      >
        <Image src={SortIcon} width={30} height={30} alt="sort" />
      </button>

      {isDropdownVisible && (
        <div className={styles.dropdownMenuContainer}>
          <div
            className={styles.dropdownItem}
            onClick={() => {
              onSortSelection("recent");
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </div>
          <div
            className={styles.dropdownItem}
            onClick={() => {
              onSortSelection("like");
              setIsDropdownVisible(false);
            }}
          >
            좋아요순
          </div>
        </div>
      )}
    </section>
  );
};

export default DropdownMenu;
