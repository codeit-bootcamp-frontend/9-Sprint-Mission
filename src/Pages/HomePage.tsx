import HeaderGnb from "../components/HeaderGnb";
import HomeCategory from "../components/HomeCategory";
import HomeHeader from "../components/HomeHeader";
import HotItem from "../assets/Img_home_01.png";
import Search from "../assets/Img_home_02.png";
import styles from "./HomePage.module.css"

export default function HomePage() {
  return (
    <>
      <HeaderGnb />
      <HomeHeader />
      <div className={styles["category-wrap"]}>
      <HomeCategory
        img={HotItem}
        badge="Hot item"
        title="인기 상품을 확인해 보세요"
        description="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해보세요"
      />
      <HomeCategory
        isReversed={true}
        img={Search}
        badge="Search"
        title="구매를 원하는 상품을 등록하세요"
        description="구매하고 싶은 물품을 검색해서 쉽게 찾아보세요"
      />
      <HomeCategory
        img={HotItem}
        badge="Register"
        title="판매를 원하는 상품을 등록하세요"
        description="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
      />
      </div>
    </>
  );
}
