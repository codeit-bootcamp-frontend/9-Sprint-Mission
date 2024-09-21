import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import logoImg from "../assets/판다얼굴.svg";
import logoText from "../assets/판다마켓.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Logo = () => {
    return (_jsxs(LogoLink, { to: "/", children: [_jsx("img", { className: "logo-img", src: logoImg, alt: "\uB85C\uACE0\uC774\uBBF8\uC9C0", width: "40", height: "40" }), _jsx("img", { className: "logo-text", src: logoText, alt: "\uD310\uB2E4\uB9C8\uCF13", width: "103", height: "35" })] }));
};
export default Logo;
const LogoLink = styled(Link) `
  display: flex;
  align-items: center;
  gap: 8.59px;
  width: 153px;
  height: 51px;

  @media (max-width: 768px) {
    width: 81px;
    height: 40px;

    .logo-img {
      display: none;
    }

    .logo-text {
      width: 81px;
      height: 40px;
    }
  }
`;
