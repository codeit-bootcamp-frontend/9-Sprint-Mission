import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import HomeContainer from "./HomeContainer";
import facebookImg from "../../../assets/ic_facebook.png";
import twitterImg from "../../../assets/ic_twitter.png";
import youtubeImg from "../../../assets/ic_youtube.png";
import instagramImg from "../../../assets/ic_instagram.png";
const HomeFooter = () => {
    return (_jsx(StyledFooter, { children: _jsxs(HomeFooterContainer, { children: [_jsx(FooterLeft, { children: "\u00A9codeit - 2024" }), _jsxs(FooterMid, { children: [_jsx("span", { children: "Privacy Policy" }), _jsx("span", { children: "FAQ" })] }), _jsxs(FooterSns, { children: [_jsx(FooterSnsImg, { src: facebookImg, alt: "\uD398\uC774\uC2A4\uBD81" }), _jsx(FooterSnsImg, { src: twitterImg, alt: "\uD2B8\uC704\uD130" }), _jsx(FooterSnsImg, { src: youtubeImg, alt: "\uC720\uD29C\uBE0C" }), _jsx(FooterSnsImg, { src: instagramImg, alt: "\uC778\uC2A4\uD0C0" })] })] }) }));
};
export default HomeFooter;
const StyledFooter = styled.div `
  font-size: 16px;
  font-weight: 400;
  background: #111827;
`;
const HomeFooterContainer = styled(HomeContainer) `
  display: flex;
  justify-content: space-between;
  padding: 32px 0 108px;
`;
const FooterLeft = styled.span `
  color: #9ca3af;
`;
const FooterMid = styled.div `
  color: #e5e7eb;
  display: flex;
  gap: 30px;
`;
const FooterSns = styled.div `
  display: flex;
  gap: 12px;
`;
const FooterSnsImg = styled.img `
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
