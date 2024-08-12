import { NavLink } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import userIcon from '../assets/images/icon/user.svg';

const Header = () => {
  const getLinkStyle = ({ isActive }) => {
    return { color: isActive ? 'active' : '' };
  };

  return (
    <header className="Header">
      <div className="header-wrap">
        <h1 className="logo-wrap">
          <NavLink to="/">
            <img src={logoImg} alt="판다마켓" />
          </NavLink>
        </h1>
        <nav className="menu-wrap">
          <ul>
            <li>
              <NavLink to="/" style={getLinkStyle}>
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
          <NavLink to="/profile">
            <img src={userIcon} alt="user" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
