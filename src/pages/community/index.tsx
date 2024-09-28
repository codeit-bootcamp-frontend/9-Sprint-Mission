import React from 'react';
import { GetServerSideProps } from 'next';
import { Article, ArticleListResponse } from '@/types/article';
import ArticleCard from '@/components/UI/community/ArticleCard';
import Pagination from '@/components/UI/Pagination';
import axiosInstance from '@/api/axiosConfig';
/**
 * @index.tsx
 * 클라이언트에 데이터를 전달하기 위한 페이지 컴포넌트
    서버 사이드에서 데이터를 가져와서 페이지를 렌더링하는 역할을 합니다. 즉,
    페이지가 렌더링될 때 필요한 데이터를 미리 가져오고, 그 데이터를 기반으로 UI를 구성합니다.
    getServerSideProps 함수 내에서 axiosInstance를 사용하여 API를 호출하고, 그 결과를 페이지의 props로 전달합니다. 이 데이터는 페이지가 로드될 때 클라이언트에 전달되어 렌더링됩니다.
 */
type CommunityPageProps = {
  articles: Article[];
  totalCount: number;
  page: number;
};

const CommunityPage: React.FC<CommunityPageProps> = ({
  articles = [],
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
      {articles.length > 0 ? (
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

// 페이지가 로드될 때 필요한 데이터(UI)를 미리 가져와서 페이지에 전달
export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;

  try {
    const response = await axiosInstance.get<ArticleListResponse>('/articles', {
      params: {
        page,
        pageSize: 10,
        orderBy: 'recent',
      },
    });

    return {
      props: {
        articles: response.data.list, // API에서 가져온 데이터 사용
        totalCount: response.data.totalCount, // API에서 가져온 데이터 사용
        page,
      },
    };
  } catch (error) {
    console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
    return {
      props: {
        articles: [],
        totalCount: 0,
        page,
      },
    };
  }
};

export default CommunityPage;
