import ArticleList from "@/components/ArticleList";
import BestArticleList from "@/components/BestArticleList";

export default function Boards() {
  const BestQuery = {
    page: 1,
    pageSize: 3,
    orderBy: "like",
  };
  const mainQuery = {
    page: 1,
    pageSize: 10,
    orderBy: "recent",
  };

  return (
    <div className="container">
      <section>
        <h1>베스트 게시글</h1>
        <BestArticleList query={BestQuery} />
      </section>
      <section>
        <h1>게시글</h1>
        <ArticleList query={mainQuery} />
      </section>
    </div>
  );
}
