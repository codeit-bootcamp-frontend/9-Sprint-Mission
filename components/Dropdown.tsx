import { useState } from "react";
import styles from "./Dropdown.module.css";

export const Dropdown = ({
  args,
  handleClickOrder,
  dropdownOpen,
}: {
  args: string[];
  handleClickOrder: (value: string) => void;
  dropdownOpen: boolean;
}) => {
  // [최신순, 인기순]
  const argsList = [...args];
  const [currentOrder, setCurrentOrder] = useState("최신순");

  const onClick = (value: string) => {
    const dict: { [key: string]: string } = {
      최신순: "recent",
      인기순: "like",
    };
    const order = dict[value];
    if (order) handleClickOrder(order);
    setCurrentOrder(value);
  };

  return (
    <div className={styles.dropbox}>
      <button className={styles["dropdown-container"]}>
        <span className={styles["dropdown-current"]}>{currentOrder}</span>
      </button>
      <div className={styles["dropdown-menu"]}>
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
