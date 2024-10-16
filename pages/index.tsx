import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HeroBottom } from "@/components/HeroBottom";
import { MainCard } from "@/components/MainCard";

export default function index() {
  return (
    <>
      <Hero />
      <div className="container">
        <div className="cards">
          <MainCard
            subtitle="Hot item"
            headline="인기 상품을 "
            secondHeadline="확인해 보세요"
            description="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
            imgSrc="/Img_home_01.png"
          />
          <MainCard
            subtitle="Search"
            headline="구매를 원하는 "
            secondHeadline="상품을 검색하세요"
            description="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
            imgSrc="/Img_home_02.png"
            reverse="reverse"
          />
          <MainCard
            subtitle="Register"
            headline="판매를 원하는 "
            secondHeadline="상품을 등록하세요"
            description="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
            imgSrc="/Img_home_03.png"
          />
        </div>
      </div>
      <HeroBottom />
      <Footer />
    </>
  );
}
