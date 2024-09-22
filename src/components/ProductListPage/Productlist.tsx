import AllItemList from "./components/AllItemList";
import BestItemList from "./components/BestItemList";

function ProductList() {
  return (
    <>
      <div id="ProductList">
        <div className="wrap_inner">
          <BestItemList />
          <AllItemList />
        </div>
      </div>
    </>
  );
}

export default ProductList;
