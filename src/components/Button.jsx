import { Link } from "react-router-dom";
import styles from "./Button.module.css";
import Uturn from "../assets/Uturn.png";

function Button() {
  return (
    <div className={styles["button-container"]}>
      <Link to="/items">
        <button className={styles.button} type="button">
          목록으로 돌아가기
          <img src={Uturn} alt="돌아가기" width={24} height={24} />
        </button>
      </Link>
    </div>
  );
}

export default Button;
