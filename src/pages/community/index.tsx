import React from "react";
import { GetServerSideProps } from "next";
import "../../styles/common.module.css";
import BestArticlesSection from "@/components/UI/community/BestArticlesSection";
import AllArticlesSection from "@/components/UI/community/AllArticlesSection";
import { getArticles } from "@/api/article";
import { Article } from "@/types/article";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await getArticles({ orderBy: "recent" });
    return {
      props: {
        initialArticles: data.list,
      },
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return {
      props: {
        initialArticles: [],
      },
    };
  }
};

interface BoardsPageProps {
  initialArticles: Article[];
}

export default function CommunityPage({ initialArticles }: BoardsPageProps) {
  return (
    <div className="min-h-screen bg-white mt-12">
      <BestArticlesSection />
      <AllArticlesSection initialArticles={initialArticles} />
    </div>
  );
}
