import { MouseEvent } from "react";
import styles from "./Dropdown.module.css";

export const Dropdown = ({
  args,
  handleClickOrder,
}: {
  args: string[];
  handleClickOrder: (value: string) => void;
}) => {
  // [최신순, 인기순]
  const argsList = [...args];

  const onClick = (value: string) => {
    let order;
    if (value === "최신순") {
      order = "recent";
    } else {
      order = "like";
    }
    handleClickOrder(order);
  };

  return (
    <div className={styles["dropdown-container"]}>
      {argsList.map((arg, index) => (
        <button
          key={index}
          className={styles[`drop-${index}`]}
          onClick={() => onClick(arg)}
          value={arg}
        >
          {arg}
        </button>
      ))}
    </div>
  );
};
