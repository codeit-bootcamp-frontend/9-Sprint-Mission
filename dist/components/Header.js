import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../assets/images/logo.svg";
import userIcon from "../assets/images/icon/login.svg";
const NavStyle = styled(NavLink) `
  font-size: 1.8rem;
  font-weight: 700;
  color: #4b5563;

  &.active {
    color: #3692ff;
  }
`;
const Header = () => {
    return (_jsx("header", { className: "Header", children: _jsxs("div", { className: "header-wrap", children: [_jsx("h1", { className: "logo-wrap", children: _jsx(Link, { to: "/", children: _jsx("img", { src: logoImg, alt: "\uD310\uB2E4\uB9C8\uCF13" }) }) }), _jsx("nav", { className: "menu-wrap", children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(NavStyle, { to: "/community", children: "\uC790\uC720\uAC8C\uC2DC\uD310" }) }), _jsx("li", { children: _jsx(NavStyle, { to: "/items", children: "\uC911\uACE0\uB9C8\uCF13" }) })] }) }), _jsx("div", { className: "user-wrap", children: _jsx(Link, { to: "/login", children: _jsx("img", { src: userIcon, alt: "login" }) }) })] }) }));
};
export default Header;
