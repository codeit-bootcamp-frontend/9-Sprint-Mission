import { useState, useEffect } from "react";
import styles from "./DropdownMenu.module.scss";

export default function DropdownMenu({ setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState("latest");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSortOrderChange = (newOrder) => {
    setSortOrder(newOrder);
    setOrder(newOrder);
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest(`.${styles["dropdown-menu"]}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className={styles["dropdown-menu"]}>
        <button onClick={toggleDropdown}>
          {order === "latest" ? "최신순" : "좋아요순"}
        </button>
        {isOpen && (
          <div className={styles["menu-box"]}>
            <button onClick={() => handleSortOrderChange("latest")}>
              최신순
            </button>
            <button onClick={() => handleSortOrderChange("likesCount")}>
              좋아요순
            </button>
          </div>
        )}
      </div>
    </>
  );
}
