import React, { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import AllArticleCard from '@/components/UI/community/AllArticleCard';
import { fetchArticles } from '@/api/article';
import Pagination from '@/components/UI/Pagination';

type AllArticlesProps = {
  initialArticles: Article[];
  totalCount: number;
  orderBy: string;
  searchQuery: string;
};
const PAGE_SIZES = 9;
const AllArticles: React.FC<AllArticlesProps> = ({
  initialArticles = [],
  totalCount,
  orderBy,
  searchQuery,
}) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchArticlesData = async (page: number) => {
      const response = await fetchArticles(page, PAGE_SIZES, orderBy);
      setArticles(response.list);
    };

    fetchArticlesData(currentPage);
  }, [currentPage, orderBy]);

  useEffect(() => {
    const filteredArticles = initialArticles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setArticles(filteredArticles);
  }, [searchQuery, initialArticles]);

  const handlePrevious = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = async () => {
    if (currentPage * PAGE_SIZES < totalCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      {articles.length > 0 ? (
        <div>
          {articles.map((article) => (
            <AllArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        onPrevious={handlePrevious}
        onNext={handleNext}
        pageSize={PAGE_SIZES}
      />
    </div>
  );
};

export default AllArticles;
