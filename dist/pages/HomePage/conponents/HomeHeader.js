import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import Button from "../../../components/Button";
import Logo from "../../../components/Logo";
import { useNavigate } from "react-router-dom";
const HomeHeader = () => {
    const nav = useNavigate();
    return (_jsxs(HeaderContainer, { children: [_jsx(Logo, {}), _jsx(Button, { onClick: () => {
                    nav("/login");
                }, children: "\uB85C\uADF8\uC778" })] }));
};
export default HomeHeader;
const HeaderContainer = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9.5px 0;
  width: 100%;
  max-width: 1110px;
  margin: 0 auto;

  @media (max-width: 1110px) {
    max-width: 696px;
  }

  @media (max-width: 744px) {
    max-width: 344px;
  }
`;
