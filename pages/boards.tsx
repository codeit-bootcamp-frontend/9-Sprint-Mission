import ArticleList from "@/components/ArticleList";
import BestArticleList from "@/components/BestArticleList";
import { useState } from "react";
interface Query {
  page: number;
  pageSize: number;
  orderBy: string;
}
export default function Boards() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mainQuery, setMainQuery] = useState<Query>({
    page: 1,
    pageSize: 10,
    orderBy: "recent",
  });
  const [bestQuery, setBestQuery] = useState<Query>({
    page: 1,
    pageSize: 3,
    orderBy: "like",
  });

  const handleClickOrder = (order: string): void => {
    setMainQuery({
      page: 1,
      pageSize: 10,
      orderBy: order,
    });
    setDropdownOpen(false);
  };

  const handleClickOrderOpen = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container">
      <section className="section">
        <BestArticleList query={bestQuery} />
      </section>

      <section className="section">
        <ArticleList
          query={mainQuery}
          handleClickOrder={handleClickOrder}
          dropdownOpen={dropdownOpen}
          handleClickOrderOpen={handleClickOrderOpen}
        />
      </section>
    </div>
  );
}
