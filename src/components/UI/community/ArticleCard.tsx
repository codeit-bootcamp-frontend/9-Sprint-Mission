import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/community/${article.id}`}>
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
  );
};

export default ArticleCard;
