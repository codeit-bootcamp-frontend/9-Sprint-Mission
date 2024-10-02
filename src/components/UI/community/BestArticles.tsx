import React from 'react';
import { GetServerSideProps } from 'next';
import { Article, ArticleListResponse } from '@/types/article';
import BestArticleCard from '@/components/UI/community/BestArticleCard';
import { fetchArticles } from '@/api/article';

const BestArticles: React.FC<{ articles: Article[]; totalCount: number }> = ({
  articles = [],
  totalCount,
}) => {
  return (
    <div className='container mx-auto px-4'>
      {articles.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const pageSize = 3; // 기본값을 설정하거나 다른 방법으로 동적으로 설정할 수 있습니다.

  try {
    const data = await fetchArticles(page, pageSize, 'like');
    return {
      props: {
        articles: data.list,
        totalCount: data.totalCount,
      },
    };
  } catch (error) {
    console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
    return {
      props: {
        articles: [],
        totalCount: 0,
      },
    };
  }
};

export default BestArticles;
