import React from 'react';
import { Link } from 'react-router-dom';
import imgHome01 from '../../assets/images/img_home_01.png';
import imgHome02 from '../../assets/images/img_home_02.png';
import imgHome03 from '../../assets/images/img_home_03.png';

const HomePage = () => {
  return (
    <main>
      <section className="main-top">
        <div className="tit-wrap container">
          <h2 className="main-tit">
            일상의 모든 물건을
            <br className="br-none" />
            거래해 보세요
          </h2>
          <Link to="/items" className="main-tit-btn">
            구경하러 가기
          </Link>
        </div>
      </section>

      <section className="main-middle">
        <ul className="main-middle-wrap container">
          <li>
            <img src={imgHome01} alt="img_home_01" />
            <div className="tit-box">
              <p className="small-txt">Hot item</p>
              <h2 className="main-tit">
                인기 상품을
                <br className="br-none" /> 확인해 보세요
              </h2>
              <p className="sub-txt">
                가장 HOT한 중고거래 물품을
                <br /> 판다 마켓에서 확인해 보세요
              </p>
            </div>
          </li>
          <li>
            <img src={imgHome02} alt="img_home_02" />
            <div className="tit-box">
              <p className="small-txt">Search</p>
              <h2 className="main-tit">
                구매를 원하는
                <br className="br-none" /> 상품을 검색하세요
              </h2>
              <p className="sub-txt">
                구매하고 싶은 물품은 검색해서
                <br /> 쉽게 찾아보세요
              </p>
            </div>
          </li>
          <li>
            <img src={imgHome03} alt="img_home_03" />
            <div className="tit-box">
              <p className="small-txt">Register</p>
              <h2 className="main-tit">
                판매를 원하는
                <br className="br-none" /> 상품을 등록하세요
              </h2>
              <p className="sub-txt">
                어떤 물건이든 판매하고 싶은 상품을
                <br /> 쉽게 등록하세요
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="main-bottom">
        <div className="tit-wrap container">
          <h2 className="main-tit">
            믿을 수 있는
            <br /> 판다마켓 중고거래
          </h2>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
