import React, { useEffect, useState } from "react";
import "../../styles/common.module.css";
import BestItemsSection from "@/components/UI/item/BestItemsSection";
import AllItemsSection from "@/components/UI/item/AllItemsSection";

export default function MarketPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <BestItemsSection width={282} height={282} />
      <AllItemsSection width={220} height={220} />
    </div>
  );
}
