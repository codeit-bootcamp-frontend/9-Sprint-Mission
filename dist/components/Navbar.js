import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import proFile from "../assets/profile.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
function Navbar() {
    return (_jsx(StyledNavBar, { children: _jsxs(NavBarContainer, { children: [_jsxs(NavBarContent, { children: [_jsx(Logo, {}), _jsxs(NavLinkContainer, { children: [_jsx(NavLink, { to: "/", children: "\uC790\uC720\uAC8C\uC2DC\uD310" }), _jsx(NavLink, { to: "/", children: "\uC911\uACE0\uB9C8\uCF13" })] })] }), _jsx(Link, { to: "/", children: _jsx("img", { src: proFile, alt: "\uD504\uB85C\uD544", width: "40", height: "40" }) })] }) }));
}
export default Navbar;
const StyledNavBar = styled.nav `
  border-bottom: 1px solid #dfdfdf;
  width: 100%;
  height: 70px;
`;
const NavBarContent = styled.div `
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;
const NavBarContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 200px 9px;
  height: 70px;

  @media (max-width: 1200px) {
    width: 696px;
    margin: 0 auto;
    padding: 10px 0 9px;
  }

  @media (max-width: 768px) {
    width: 344px;
    margin: 0 auto;
    padding: 10px 0 9px;
    gap: 8px;
  }
`;
const NavLinkContainer = styled.div `
  display: flex;
  gap: 30px;
  padding: 21px 15px;
`;
const NavLink = styled(Link) `
  font-size: 18px;
  font-weight: 700;
  color: #4b5563;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
