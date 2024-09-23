import React from "react";
import BestItemsSection from "./components/BestItemSection/BestItemsSection";
import AllItemsSection from "./components/AllItemsSection/AllItemsSection";

function MarketPage() {
  return (
    <div className="wrapper">
      <BestItemsSection />
      <AllItemsSection />
    </div>
  );
}

export default MarketPage;
