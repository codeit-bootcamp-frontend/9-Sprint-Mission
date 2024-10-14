import "./Main.css";
import { BestProductList } from "./BestProductList";
import { TotalProductList } from "./TotalProductList";
import Header from "./HeaderGnb";

function Main() {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="main-layout">
          <section className="item-container">
            <h2>베스트 상품</h2>
            <BestProductList />
          </section>
          <section className="item-container">
            <TotalProductList />
          </section>
        </div>
      </div>
    </>
  );
}

export default Main;
