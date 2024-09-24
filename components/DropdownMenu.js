import { useState } from "react";
import styles from "./DropdownMenu.module.scss";

export default function DropdownMenu({ setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles["dropdown-menu"]}>
        <button onClick={toggleDropdown}>최신순</button>
        {isOpen && (
          <div className={styles["menu-box"]}>
            <button onClick={() => handleSortOrderChange("latest")}>
              최신순
            </button>
            <button onClick={() => handleSortOrderChange("likes")}>
              좋아요순
            </button>
          </div>
        )}
      </div>
    </>
  );
}
