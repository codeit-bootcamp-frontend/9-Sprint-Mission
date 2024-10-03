import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

export const Dropdown = ({
  args,
  handleClickOrder,
  dropdownOpen,
  handleClickOrderOpen,
}: {
  args: string[];
  handleClickOrder: (value: string) => void;
  dropdownOpen: boolean;
  handleClickOrderOpen: () => void;
}) => {
  // [최신순, 인기순]
  const argsList = [...args];
  const [currentOrder, setCurrentOrder] = useState("최신순");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const onClick = (arg: string) => {
    const dict: { [key: string]: string } = {
      최신순: "recent",
      인기순: "like",
    };
    const order = dict[arg];
    if (order) handleClickOrder(order);
    setCurrentOrder(arg);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      if (dropdownOpen) handleClickOrderOpen();
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // 언마운트 시 이벤트 리스너를 제거하는 클린업 함수
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // dropdown 열려있는데 바깥영역 누르면 handleClickOrderOpen 호출
  return (
    <div className={styles.dropbox} ref={dropdownRef}>
      <button
        className={styles["dropdown-container"]}
        onClick={handleClickOrderOpen}
      >
        <span className={styles["dropdown-current"]}>{currentOrder}</span>
      </button>
      <div
        className={`${styles["dropdown-menu"]} ${dropdownOpen ? "" : styles.hidden}`}
      >
        {/* hidden 스타일 제어하기 */}
        {argsList.map((arg, index) => (
          <button
            key={index}
            className={styles[`dropdown-button`]}
            onClick={() => onClick(arg)}
            value={arg}
          >
            {arg}
          </button>
        ))}
      </div>
    </div>
  );
};
