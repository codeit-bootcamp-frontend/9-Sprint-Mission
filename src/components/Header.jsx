import { Link, NavLink } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import userIcon from '../assets/images/icon/login.svg';

const Header = () => {
  const getLinkStyle = ({ isActive }) => {
    return { color: isActive ? 'active' : '' };
  };

  return (
    <header className="Header">
      <div className="header-wrap">
        <h1 className="logo-wrap">
          <Link to="/">
            <img src={logoImg} alt="판다마켓" />
          </Link>
        </h1>
        <nav className="menu-wrap">
          <ul>
            <li>
              <NavLink to="/community" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="user-wrap">
          <Link to="/login">
            <img src={userIcon} alt="login" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
