import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import HomeContainer from "../conponents/HomeContainer";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
const HomeBanner = ({ src, text, position }) => {
    const nav = useNavigate();
    return (_jsx(StyledHomeBanner, { children: _jsx(HomeContainer, { children: _jsx(HomeBannerMain, { src: src, children: _jsxs(HomeBannerElement, { children: [_jsx(HomeBannerText, { children: text }), position === "top" && (_jsx(Button, { width: "357", height: "56", radius: "40", onClick: () => nav("/items"), children: "\uAD6C\uACBD\uD558\uB7EC \uAC00\uAE30" }))] }) }) }) }));
};
export default HomeBanner;
const StyledHomeBanner = styled.div `
  width: 100%;
  height: 540px;
  background-color: #cfe5ff;
  display: flex;
  align-items: flex-end;

  @media (max-width: 1110px) {
    height: 744px;
  }

  @media (max-width: 744px) {
    height: 540px;
  }
`;
const HomeBannerMain = styled.div `
  background: url(${(props) => props.src}) no-repeat right 0 bottom 0;
  background-size: 746px 340px;
  width: 100%;
  height: 340px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media (max-width: 1110px) {
    background-position: center bottom 0;
    background-size: 744px 340px;
    height: 744px;
    flex-direction: column;
  }

  @media (max-width: 744px) {
    background-size: 375px 190px;
    height: 540px;
  }
`;
const HomeBannerElement = styled.div `
  width: 357px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media (max-width: 1110px) {
    width: 512px;
    margin-top: 84px;
  }

  @media (max-width: 744px) {
    width: 240px;
    margin-top: 48px;
  }
`;
const HomeBannerText = styled.h2 `
  font-size: 40px;
  font-weight: 700;
  color: #374151;

  @media (max-width: 744px) {
    font-size: 32px;
  }
`;
