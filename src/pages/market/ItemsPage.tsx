import BestItemsSection from "../../entities/item/ui/best-items";
import AllItemsSection from "../../entities/item/ui/all-items";
import "./ItemsPage.css";

function ItemsPage() {
  return (
    <div className="wrapper">
      <BestItemsSection />
      <AllItemsSection />
    </div>
  );
}

export default ItemsPage;
