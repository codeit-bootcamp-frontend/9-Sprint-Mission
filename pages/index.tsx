import Container from "@/components/Container";
import HomeBanner from "@/components/home/HomeBanner";
import HomeFooter from "@/components/home/HomeFooter";
import HomeMainContent from "@/components/home/HomeMainContent";
import "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <HomeBanner
        content={"일상의 모든 물건을 거래해 보세요"}
        image={"/images/Img_home_top.png"}
        position="top"
      />
      <Container>
        <HomeMainContent
          src="/images/Img_home_01.png"
          subtitle="Hot Item"
          title="인기 상품을 확인해 보세요"
          content="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
        />
        <HomeMainContent
          src="/images/Img_home_02.png"
          subtitle="Search"
          title="구매를 원하는 상품을 검색하세요"
          content="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
          position="right"
        />
        <HomeMainContent
          src="/images/Img_home_03.png"
          subtitle="Register"
          title="판매를 원하는 상품을 등록하세요"
          content="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
        />
      </Container>
      <HomeBanner
        content={"믿을 수 있는 판다마켓 중고 거래"}
        image={"/images/Img_home_bottom.png"}
        position="bottom"
      />
      <HomeFooter />
    </>
  );
}
