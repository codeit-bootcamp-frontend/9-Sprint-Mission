import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarPanda() {
  let navigate = useNavigate();
  let [classState, setClassState] = useState(false);

  let handleClick = () => {
    setClassState(!classState);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-title">
          <div className="nav-logo">
            <img src="/판다 얼굴.png" className="panda-face" alt="logo-face" />
            <img src="/판다마켓.png" alt="logo-title" />
          </div>
          <Link to="/" className="nav-content">
            자유게시판
          </Link>
          <Link
            to="/items"
            onClick={handleClick}
            className={classState == false ? "nav-content" : "nav-active"}
          >
            중고마켓
          </Link>
        </div>

        <div>
          <img src="/ic_profile.png" alt="logo-icon" />
        </div>
      </div>
    </nav>
  );
}

export default NavbarPanda;
