import { useMemo } from "react";
import {
  useFetchAllArticles,
  useFetchTopArticles,
} from "@/hooks/useFetchArticles";
import { BestArticles } from "../../components/boards/BestArticles";
import { ArticleList } from "../../components/boards/ArticleList";
import S from "./index.style";

export default function BoardsPage() {
  const totalArticles = useFetchAllArticles();
  const bestArticles = useFetchTopArticles(
    // query가 매번 새로 생성되어 무한 리렌더링 되는 것을 방지
    useMemo(() => ({ pageSize: 3, orderBy: "like" }), [])
  );

  return (
      <S.Container>
        <BestArticles articles={bestArticles} />
        <ArticleList articles={totalArticles} />
      </S.Container>
  );
}
