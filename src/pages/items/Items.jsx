import React from "react";
import BestItemsSection from "./components/best-items";
import AllItemsSection from "./components/all-items";
import "./Items.css";

function UsedItemsPage() {
  return (
    <div className="wrapper">
      <BestItemsSection />
      <AllItemsSection />
    </div>
  );
}

export default UsedItemsPage;
