import { NavLink } from "react-router-dom";
import styles from "./styles/BackBtn.module.css";

export function BackBtn() {
  return (
    <NavLink to="/items">
      <div className={styles.buttonBox}>
        <button type="button" className={styles.backBtn}>
          목록으로 돌아가기
          <div className={styles.backIcon}></div>
        </button>
      </div>
    </NavLink>
  );
}
