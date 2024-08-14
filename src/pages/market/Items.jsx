import React from "react";
import BestItemsSection from "../../entities/item/ui/best-items";
import AllItemsSection from "../../entities/item/ui/all-items";
import "./Items.css";

function ItemsPage() {
  return (
    <div className="wrapper">
      <BestItemsSection />
      <AllItemsSection />
    </div>
  );
}

export default ItemsPage;
