import styles from "./HomeHeader.module.css";
import HeaderImg from "../assets/Img_home_top.png";
import FormButton from "./FormButton";

export default function HomeHeader() {
  return (
    <div className={styles["header-container"]}>
      <div className={styles["items-link-container"]}>
        <span>일상의 모든 물건을 <br />거래해 보세요</span>
        <FormButton type="button" color="blue">구경하러가기</FormButton>
      </div>
      <img src={HeaderImg} alt="" className={styles["header-img"]}/>
    </div>
  )
}