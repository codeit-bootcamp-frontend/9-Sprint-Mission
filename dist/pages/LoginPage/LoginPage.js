import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LoginContainer from "./components/LoginContainer";
import LogoImg from "../../assets/logo.svg";
import styled from "styled-components";
import LoginInput from "./components/LoginInput";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const nav = useNavigate();
    return (_jsxs(LoginContainer, { children: [_jsx(Logo, { onClick: () => nav("/"), src: LogoImg, alt: "\uB85C\uACE0" }), _jsx(LoginInput, { text: "\uC774\uBA54\uC77C", name: "email", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694" }), _jsx(LoginInput, { text: "\uB2C9\uB124\uC784", name: "nickname", placeholder: "\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694" })] }));
};
export default LoginPage;
const Logo = styled.img `
  width: 396px;
  height: 132px;
  margin-bottom: 40px;
  cursor: pointer;
`;
