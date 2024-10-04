import { useState, useEffect } from "react";
import styles from "./DropdownMenu.module.scss";

// Props 인터페이스 정의
interface DropdownMenuProps {
  setSortOrder: (order: string) => void; // setSortOrder 함수 타입
}

export default function DropdownMenu({ setSortOrder }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<string>("recent");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSortOrderChange = (newOrder: string) => {
    setSortOrder(newOrder);
    setOrder(newOrder);
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (isOpen && target && !target.closest(`.${styles["dropdown-menu"]}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles["dropdown-menu"]}>
      <button onClick={toggleDropdown}>
        {order === "recent" ? "최신순" : "좋아요순"}
      </button>
      {isOpen && (
        <div className={styles["menu-box"]}>
          <button onClick={() => handleSortOrderChange("recent")}>
            최신순
          </button>
          <button onClick={() => handleSortOrderChange("like")}>
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
}
