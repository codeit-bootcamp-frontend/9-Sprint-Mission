import React, { useState } from 'react';
import Link from 'next/link';
import useArticles from '@/hooks/useArticles';

export default function CommunityPage() {
  const [page, setPage] = useState(1);
  const { articles, totalCount, loading, error } = useArticles(page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>커뮤니티</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : articles.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map((article) => (
            <Link href={`/community/${article.id}`} key={article.id}>
              <div className='bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow'>
                <img
                  src={article.image || 'https://via.placeholder.com/300'}
                  alt={article.title}
                  className='w-full h-48 object-cover rounded-md mb-4'
                />
                <h2 className='text-xl font-semibold mb-2'>{article.title}</h2>
                <p className='text-gray-600 mb-2'>
                  {article.content.substring(0, 100)}...
                </p>
                <div className='flex justify-between items-center text-sm text-gray-500'>
                  <span>{article.writer.nickname}</span>
                  <span>좋아요: {article.likeCount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
      <div className='mt-8 flex justify-center'>
        <button
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2 disabled:bg-gray-300'
        >
          이전
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * 10 >= totalCount}
          className='bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300'
        >
          다음
        </button>
      </div>
    </div>
  );
}
