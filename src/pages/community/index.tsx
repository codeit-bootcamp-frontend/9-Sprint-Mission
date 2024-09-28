import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Article, ArticleListResponse } from '@/types/article';
import ArticleCard from '@/components/UI/community/ArticleCard';
import Pagination from '@/components/UI/Pagination';

type CommunityPageProps = {
  articles: Article[];
  totalCount: number;
  page: number;
};

// CommunityPage 컴포넌트 정의
const CommunityPage: React.FC<CommunityPageProps> = ({
  articles = [], // articles의 기본값을 빈 배열로 설정하여 undefined 방지
  totalCount,
  page,
}) => {
  const handlePrevious = () => {
    window.location.href = `/community?page=${Math.max(page - 1, 1)}`;
  };

  const handleNext = () => {
    window.location.href = `/community?page=${page + 1}`;
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>커뮤니티</h1>
      {articles.length > 0 ? ( // articles가 존재하는지 확인
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
      <Pagination
        currentPage={page}
        totalCount={totalCount}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

// getServerSideProps를 사용하여 서버에서 데이터를 받아오는 함수
export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;

  try {
    const response = await axios.get<ArticleListResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
      {
        params: {
          page: page,
          pageSize: 10,
          orderBy: 'recent',
        },
      }
    );

    return {
      props: {
        articles: response.data.list,
        totalCount: response.data.totalCount,
        page,
      },
    };
  } catch (error) {
    console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
    return {
      props: {
        articles: [], // 빈 배열로 초기화하여 에러 방지
        totalCount: 0,
        page,
      },
    };
  }
};

export default CommunityPage;
