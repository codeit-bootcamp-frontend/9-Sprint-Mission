import axios from "axios";
import { getArticles } from "@/api/article";
import { GetServerSideProps } from "next";
import { Article, ArticleSortOption } from "@/types/article";
import BestArticle from "@/components/UI/boards/BestArticle";
import AllArticle from "@/components/UI/boards/AllArticle";

interface Props {
  bestArticles: Article[];
  AllArticles: Article[];
  orderBy: ArticleSortOption;
  keyword: string | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let bestArticles = [];
  let AllArticles = [];

  const { keyword, orderBy, pageSize } = context.query;

  const AllKeyword = typeof keyword === "string" ? keyword : "";
  const AllorderBy = typeof orderBy === "string" ? orderBy : "recent";
  const BestPageSize = typeof pageSize === "number" ? pageSize : 3;

  // 비동기 요청을 배열로 준비
  const promises = [
    getArticles({ orderBy: "like", pageSize: BestPageSize }),
    getArticles({ orderBy: AllorderBy, pageSize: 10, keyword: AllKeyword }),
  ];

  try {
    const [bestData, AllData] = await Promise.all(promises);
    bestArticles = bestData.list ?? [];
    AllArticles = AllData.list ?? [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status, error.message);
    } else {
      throw new Error("에러가 발생했습니다.");
    }
  }

  return {
    props: {
      bestArticles,
      AllArticles,
      orderBy: AllorderBy,
      keyword: AllKeyword,
    },
  };
};

const Boards = ({ bestArticles, AllArticles, orderBy, keyword }: Props) => {
  return (
    <div className="container">
      <BestArticle articles={bestArticles} />
      <AllArticle articles={AllArticles} orderBy={orderBy} keyword={keyword} />
    </div>
  );
};

export default Boards;
