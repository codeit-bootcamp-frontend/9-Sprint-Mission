import HomeHeader from "./conponents/HomeHeader";
import HomeBanner from "./conponents/HomeBanner";
import HomeTopImg from "../../assets/Img_home_top.png";
import HomeBottomImg from "../../assets/Img_home_bottom.png";
import HomeMainContent from "./conponents/HomeMainContent";
import HomeImg1 from "../../assets/Img_home_01.png";
import HomeImg2 from "../../assets/Img_home_02.png";
import HomeImg3 from "../../assets/Img_home_03.png";
import HomeFooter from "./conponents/HomeFooter";

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <HomeBanner
        src={HomeTopImg}
        text={
          <>
            일상의 모든 물건을
            <br /> 거래해 보세요
          </>
        }
        position="top"
      />
      <HomeMainContent
        src={HomeImg1}
        subtitle="Hot Item"
        title={
          <h2>
            인기 상품을
            <br />
            확인해 보세요
          </h2>
        }
        content={
          <p>
            가장 HOT한 중고거래 물품을
            <br /> 판다 마켓에서 확인해 보세요
          </p>
        }
      />
      <HomeMainContent
        src={HomeImg2}
        subtitle="Search"
        title={
          <h2>
            구매를 원하는
            <br />
            상품을 검색하세요
          </h2>
        }
        content={
          <p>
            구매하고 싶은 물품은 검색해서
            <br /> 쉽게 찾아보세요
          </p>
        }
      />
      <HomeMainContent
        src={HomeImg3}
        subtitle="Hot Item"
        title={
          <h2>
            판매를 원하는
            <br />
            상품을 등록하세요
          </h2>
        }
        content={
          <p>
            어떤 물건이든 판매하고 싶은 상품을
            <br /> 쉽게 등록하세요
          </p>
        }
      />
      <HomeBanner
        src={HomeBottomImg}
        text={
          <>
            믿을 수 있는
            <br /> 판다마켓 중고 거래
          </>
        }
        position="bottom"
      />
      <HomeFooter />
    </>
  );
};

export default HomePage;
