import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import HomeContainer from "./HomeContainer";
const HomeMainContent = ({ src, subtitle, title, content, }) => {
    return (_jsxs(StyledMainContent, { children: [_jsx(MainContentImg, { src: src, width: "579", height: "444" }), _jsxs(MainContent, { children: [_jsx("span", { children: subtitle }), title, content] })] }));
};
export default HomeMainContent;
const StyledMainContent = styled(HomeContainer) `
  padding: 138px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64px;
`;
const MainContentImg = styled.img ``;
const MainContent = styled.div `
  font-weight: 700;

  span {
    font-size: 18px;
    color: #3692ff;
  }

  h2 {
    font-size: 40px;
    margin: 12px 0 24px;
    line-height: 56px;
  }

  p {
    font-size: 24px;
    font-weight: 500;
    color: #374151;
  }
`;
