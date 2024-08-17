import "./Main.css";
import { BestProductList } from "./BestProductList.jsx";
import { TotalProductList } from "./TotalProductList.jsx";

function Main() {

  return (
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
  );
}

export default Main;
