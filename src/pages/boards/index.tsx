import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Article } from '@/types/article';
import BestArticles from '@/components/UI/boards/BestArticles';
import AllArticles from '@/components/UI/boards/AllArticles';
import Dropdown from '@/components/UI/Dropdown';
import SearchBar from '@/components/UI/SearchBar';
import usePageSize from '@/hooks/usePageSize';
import { fetchArticles } from '@/api/article'; // fetchArticles 가져오기
import Link from 'next/link';
import AddBoardPage from '../addboard/index';

const BoardsPage: React.FC<{
  bestArticles: Article[];
  allArticles: Article[];
  totalCount: number;
}> = ({ bestArticles, allArticles, totalCount }) => {
  const [selectedOrder, setSelectedOrder] = useState('recent');
  const [allArticlesData, setAllArticlesData] = useState(allArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const bestPageSize = usePageSize();
  const [bestArticlesData, setBestArticlesData] = useState(bestArticles);

  // 검색어와 정렬 기준에 따라 API 호출
  const fetchArticlesData = async (orderBy: string, search: string) => {
    const response = await fetchArticles(1, 9, orderBy, search); // page, pageSize, orderBy, search 전달
    setAllArticlesData(response.list);
  };

  // 검색 시 API 호출
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleOrderChange = async (value: string) => {
    setSelectedOrder(value);
    await fetchArticlesData(value, searchQuery); // 정렬 기준에 따른 게시글 불러오기
  };

  useEffect(() => {
    const fetchBestArticles = async () => {
      const response = await fetchArticles(1, bestPageSize, 'like');
      setBestArticlesData(response.list);
    };

    fetchBestArticles();
  }, [bestPageSize]);

  return (
    <div className='container mx-auto px-4 py-8 mt-12'>
      <h1 className='text-2xl font-bold mb-4'>베스트 게시글</h1>
      <BestArticles
        articles={bestArticlesData}
        totalCount={bestArticlesData.length}
      />
      <div className='flex flex-col mt-8 mb-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold '>전체 게시글</h1>
          <Link
            href='/addboard'
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg`}
          >
            글쓰기
          </Link>
        </div>
        <div className='flex justify-between gap-4 items-center'>
          <SearchBar onSearch={handleSearch} />
          <Dropdown
            options={[
              { label: '최신순', value: 'recent' },
              { label: '좋아요순', value: 'like' },
            ]}
            selectedValue={selectedOrder}
            onChange={handleOrderChange}
          />
        </div>
      </div>
      <AllArticles
        initialArticles={allArticlesData}
        totalCount={totalCount}
        orderBy={selectedOrder}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const orderBy = (context.query.orderBy as string) || 'recent';

  const userAgent = context.req.headers['user-agent'];
  let bestPageSize = 3;

  if (userAgent) {
    if (/Mobi|Android/i.test(userAgent)) {
      bestPageSize = 1;
    } else if (/Tablet|iPad/i.test(userAgent)) {
      bestPageSize = 2;
    }
  }

  try {
    const bestResponse = await fetchArticles(page, bestPageSize, 'like');
    const allResponse = await fetchArticles(page, 9, orderBy);

    return {
      props: {
        bestArticles: bestResponse.list,
        allArticles: allResponse.list,
        totalCount: allResponse.totalCount,
      },
    };
  } catch (error) {
    console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
    return {
      props: {
        bestArticles: [],
        allArticles: [],
        totalCount: 0,
      },
    };
  }
};

export default BoardsPage;
