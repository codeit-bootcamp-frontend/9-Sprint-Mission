import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import BestArticleList from "@/components/BestArticleList";
import ArticleList from "../components/ArticleList";
import SearchForm from "@/components/SearchForm";
import DropdownMenu from "@/components/DropdownMenu";
import styles from "@/styles/boards.module.scss";

export default function Boards() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");

  async function getArticles() {
    try {
      const res = await axios.get("/articles");
      const allArticles = res.data.list || [];
      setArticles(allArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  // bestarticle
  const getBestArticlesCount = () => {
    const width = window.innerWidth;
    return width <= 768 ? 1 : width <= 1200 ? 2 : 3;
  };

  const updateBestArticles = () => {
    const sortedArticles = [...articles].sort(
      (a, b) => b.likeCount - a.likeCount
    );
    setBestArticles(sortedArticles.slice(0, getBestArticlesCount()));
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      updateBestArticles(articles);
    }
    const handleResize = () => {
      if (articles.length > 0) {
        updateBestArticles();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [articles]);

  // dropdownmenu
  useEffect(() => {
    if (sortOrder === "latest") {
      setArticles((prevArticles) =>
        [...prevArticles].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } else if (sortOrder === "likes") {
      setArticles((prevArticles) =>
        [...prevArticles].sort((a, b) => b.likeCount - a.likeCount)
      );
    }
  }, [sortOrder]);

  return (
    <>
      <div className="best-article">
        <h2 className="page-title">베스트 게시글</h2>
        <BestArticleList bestArticles={bestArticles} />
      </div>
      <div className={styles.article}>
        <h2 className="page-title">
          게시글
          <button className="btn-box" type="button">
            글쓰기
          </button>
        </h2>
        <div className={styles["filter-section"]}>
          <SearchForm />
          <DropdownMenu setSortOrder={setSortOrder} />
        </div>
        <ArticleList articles={articles} />
      </div>
    </>
  );
}
