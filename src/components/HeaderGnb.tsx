import gnbImg from "../assets/Group 19.png";
import loginImg from "../assets/Frame 2609463.png";
import styles from "./HeaderGnb.module.css";
import { Link, NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import profile from "../assets/ic_profile.png";

// function getLinkStyle({ isActive }: { isActive: boolean }) {
//   return {
//     color: isActive ? "#3692ff" : "#4B5563",
//   };
// }

function Header() {

  const accessToken = localStorage.getItem("accessToken");

  return (
    <div className={styles.gnb}>
      <div className={styles["gnb-board"]}>
        <h1>
          <img className={styles["gnb-img"]} src={gnbImg} alt="판다마켓"></img>
        </h1>
        {/* { // 로그인하면 보인다.
          <ul className={styles["gnb-menus"]}>
            <li className={styles["gnb-menu"]}>
              <Link to="/">자유게시판</Link>
            </li>
            <li className={styles["gnb-menu"]}>
              <NavLink to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        } */}
      </div>
      {/* <div className={styles["login-img-box"]}>
        <img
          className={styles["login-img"]}
          src={loginImg}
          alt="로그인이미지"
        ></img>
      </div> */}
      {!accessToken ? <LoginButton children="로그인" /> : <img src={profile} alt="" width={32} height={32}/>}
     
    </div>
  );
}

export default Header;
