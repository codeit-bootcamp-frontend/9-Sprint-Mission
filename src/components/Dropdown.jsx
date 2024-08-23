import { useEffect } from "react";
import styles from "../components/styles/Dropdown.module.css";
export function Dropdown({ className }) {
  useEffect(() => {}, [className]);

  return (
    <div className={`${styles.dropdown} ${className}}`}>
      <button>수정하기</button>
      <button>삭제하기</button>
    </div>
  );
}
