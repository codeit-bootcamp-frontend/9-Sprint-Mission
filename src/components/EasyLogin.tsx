import google from "../assets/Component2.png";
import kakao from "../assets/Component3.png";
import styles from "./EasyLogin.module.css";

export default function EasyLogin() {
return(
  <>
  <div className={styles["easy-login-container"]}>
    <div className={styles.title}>간편 로그인하기</div>
    <div className={styles["sns-link-container"]}>
      <img src={google} alt=""/>
      <img src={kakao} alt=""/>
    </div>
  </div>
  </>
)
}