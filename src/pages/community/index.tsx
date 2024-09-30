// src/pages/community/index.tsx
import React from "react";
import "../../styles/common.module.css";
import BestArticlesSection from "@/components/UI/community/BestArticlesSection";
import AllArticlesSection from "@/components/UI/community/AllArticlesSection";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white mt-12">
      <BestArticlesSection />
      <AllArticlesSection />
    </div>
  );
}
