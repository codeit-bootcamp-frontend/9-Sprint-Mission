import { useEffect, useState } from "react";
import { Article } from "@/types/articles";
import { getArticles } from "@/api/getArticles";
import { useQuery } from "@/context/QueryContext";

export function useFetchAllArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { query } = useQuery(); // 전역 query 값 가져오기

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await getArticles(undefined, query);
        const fetchedArticles = result.list as Article[];
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, [query]);

  return articles;
}

export function useFetchTopArticles(query: object) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await getArticles(undefined, query);
        const fetchedArticles = result.list as Article[];
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, [query]);

  return articles;
}
