import styled from "styled-components";
import HomeContainer from "./HomeContainer";
import facebookImg from "../../../assets/ic_facebook.png";
import twitterImg from "../../../assets/ic_twitter.png";
import youtubeImg from "../../../assets/ic_youtube.png";
import instagramImg from "../../../assets/ic_instagram.png";

const HomeFooter = () => {
  return (
    <StyledFooter>
      <HomeFooterContainer>
        <FooterLeft>©codeit - 2024</FooterLeft>
        <FooterMid>
          <span>Privacy Policy</span>
          <span>FAQ</span>
        </FooterMid>
        <FooterSns>
          <FooterSnsImg src={facebookImg} alt="페이스북" />
          <FooterSnsImg src={twitterImg} alt="트위터" />
          <FooterSnsImg src={youtubeImg} alt="유튜브" />
          <FooterSnsImg src={instagramImg} alt="인스타" />
        </FooterSns>
      </HomeFooterContainer>
    </StyledFooter>
  );
};

export default HomeFooter;

const StyledFooter = styled.div`
  font-size: 16px;
  font-weight: 400;
  background: #111827;
`;

const HomeFooterContainer = styled(HomeContainer)`
  display: flex;
  justify-content: space-between;
  padding: 32px 0 108px;
`;

const FooterLeft = styled.span`
  color: #9ca3af;
`;

const FooterMid = styled.div`
  color: #e5e7eb;
  display: flex;
  gap: 30px;
`;

const FooterSns = styled.div`
  display: flex;
  gap: 12px;
`;

const FooterSnsImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
