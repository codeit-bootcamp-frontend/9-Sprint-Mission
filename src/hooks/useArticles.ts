import { useState, useEffect } from 'react';
import axios from 'axios';

type Article = {
  id: number;
  title: string;
  content: string;
  image: string;
  writer: {
    id: number;
    nickname: string;
  };
  likeCount: number;
  createdAt: string;
  updatedAt: string;
};

const useArticles = (page: number) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{
          totalCount: number;
          list: Article[];
        }>(`${process.env.NEXT_PUBLIC_BASE_URL}articles`, {
          params: {
            page,
            pageSize: 10,
            orderBy: 'recent',
          },
        });
        setArticles(response.data.list);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Error fetching articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  return { articles, totalCount, loading, error };
};

export default useArticles;
