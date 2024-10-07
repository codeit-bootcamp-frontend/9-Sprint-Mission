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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let bestArticles = [];
  let AllArticles = [];

  const { keyword, orderBy, pageSize } = context.query;

  let AllKeyword = "";
  if (typeof keyword === "string" && typeof keyword !== undefined) {
    AllKeyword = keyword;
  }

  let AllorderBy = "recent";
  if (typeof orderBy === "string" && typeof orderBy !== undefined) {
    AllorderBy = orderBy;
  }

  let BestPageSize = 3;
  if (typeof pageSize === "number" && typeof pageSize !== undefined) {
    BestPageSize = pageSize;
  }

  try {
    const bestData = await getArticles({
      orderBy: "like",
      pageSize: BestPageSize,
    });
    bestArticles = bestData.list ?? [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status, error.message);
    } else {
      throw new Error("에러가 발생했습니다.");
    }
  }

  try {
    const AllData = await getArticles({
      orderBy: AllorderBy,
      pageSize: 10,
      keyword: AllKeyword,
    });
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
    },
  };
};

const Boards = ({ bestArticles, AllArticles, orderBy }: Props) => {
  return (
    <div className="container">
      <BestArticle articles={bestArticles} />
      <AllArticle articles={AllArticles} orderBy={orderBy} />
    </div>
  );
};

export default Boards;
