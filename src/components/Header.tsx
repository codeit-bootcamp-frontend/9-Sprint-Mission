import gnbImg from "../assets/Group 19.png";
import loginImg from "../assets/Frame 2609463.png";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";


function getLinkStyle({ isActive } : {isActive: boolean}) {

  return {
    color: isActive ? "#3692ff" : "#4B5563",
  };
}

function Header() {
  return (
    <div className={styles.gnb}>
      <div className={styles["gnb-board"]}>
        <h1>
            <img className={styles["gnb-img"]} src={gnbImg} alt="판다마켓"></img>
        </h1>
        <ul className={styles["gnb-menus"]}>
          <li className={styles["gnb-menu"]}>
            <Link to='/'>자유게시판</Link>
          </li>
          <li className={styles["gnb-menu"]}>
            <NavLink to="/items" style={getLinkStyle}>
              중고마켓
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles["login-img-box"]}>
        <img className={styles["login-img"]} src={loginImg} alt="로그인이미지"></img>
      </div>
    </div>
  );
}

export default Header;
