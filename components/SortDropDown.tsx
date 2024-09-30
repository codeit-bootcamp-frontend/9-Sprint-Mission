import React, { useState } from "react";
import { useSort } from "@/context/SortContext";
import styles from "@/components/SortDropDown.module.css";
import sortButton from "@/public/assets/btn-sort.svg";
import Image from "next/image";

const SortDropDown: React.FC = () => {
  const { sortBy, setSortBy } = useSort();
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태 관리

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 드롭다운 열고 닫기
  };

  return (
    <div className={styles.sortContainer}>
      <div onClick={toggleDropdown} className={styles.sortButton}>
        <Image fill src={sortButton} alt="정렬" />
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          <li
            className={styles.dropdownList}
            onClick={() => handleSortChange("recent")}
          >
            최신순
          </li>
          <li
            className={styles.dropdownList}
            onClick={() => handleSortChange("like")}
          >
            좋아요순
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortDropDown;
