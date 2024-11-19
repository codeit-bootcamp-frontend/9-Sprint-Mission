// src/pages/community/index.tsx
import React, { useEffect, useState } from "react";
import "../../styles/common.module.css";
import BestArticlesSection from "@/components/UI/community/BestArticlesSection";
import AllArticlesSection from "@/components/UI/community/AllArticlesSection";

const CommunityPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white mt-12">
      <BestArticlesSection />
      <AllArticlesSection />
    </div>
  );
};

export default CommunityPage;
