import "./MainContents.css";

const MainContents = () => {
  return (
    <main>
      <div className="mainContents">
        <div className="contentsBox">
          <div className="contentsInner">
            <img src="/images/Img_home_01.svg" alt="메인이미지" />
            <div className="mainDescription">
              <h2>Hot Itmes</h2>
              <h3>인기 상품을 확인해 보세요</h3>
              <p>
                가장 HOT한 중고거래 물품을 <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
        <div className="contentsBox">
          <div className="contentsInner second">
            <img src="/images/Img_home_02.svg" alt="메인이미지" />
            <div className="mainDescription">
              <h2>Search</h2>
              <h3>구매를 원하는 상품을 검색하세요</h3>
              <p>
                구매하고 싶은 물품은 검색해서 <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
        </div>
        <div className="contentsBox">
          <div className="contentsInner">
            <img src="/images/Img_home_03.svg" alt="메인이미지" />
            <div className="mainDescription">
              <h2>Register</h2>
              <h3>판매를 원하는 상품을 등록하세요</h3>
              <p>
                어떤 물건이든 판매하고 싶은 상품을 <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContents;
