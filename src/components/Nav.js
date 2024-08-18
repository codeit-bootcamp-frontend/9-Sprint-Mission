import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import styles from "./Nav.module.css";

function getLinkStyle({ isActive }, path) {
  return {
    color:
      isActive || window.location.pathname === path ? "#3692ff" : undefined,
  };
}

function Nav() {
  return (
    <header className={styles.headerContainer}>
      <h1>
        <a className={styles.headerLogoLink} href="./items">
          <Link to="/items">
            <img
              className={styles.headerLogo}
              src={logo}
              alt="판다마켓"
              width={153}
              height={51}
            />
          </Link>
        </a>
      </h1>
      <div className={styles.headerItems}>
        <NavLink
          className={styles.headerItem}
          to="/community"
          style={getLinkStyle}
        >
          자유게시판
        </NavLink>
        <NavLink
          className={styles.headerItem}
          to="/items"
          style={(navData) => getLinkStyle(navData, "/additem")}
        >
          중고마켓
        </NavLink>
      </div>
      <button className={styles.headerProfile} type="button">
        <img
          className={styles.headerProfileImg}
          src={profile}
          alt="프로필"
          width={40}
          height={40}
        />
      </button>
    </header>
  );
}

export default Nav;
