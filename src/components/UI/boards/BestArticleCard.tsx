import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import HeartIcon from '@/images/icons/ic_heart.svg'; // 아이콘 가져오기
import { formatDate } from '@/utils/dateUtils';
import MedalIcon from '@/images/icons/ic_medal.svg';

type BestArticleCardProps = {
  article: Article;
};

const BestArticleCard: React.FC<BestArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/boards/${article.id}`}>
      <div className='bg-gray-50 rounded-lg px-6 pt-12 pb-2 cursor-pointer hover:shadow-lg transition-shadow relative'>
        <div className='absolute flex justify-between items-center top-0 left-5 w-26 h-8 p-2 px-6 gap-2 rounded-b-2xl bg-[#3692FF] text-white font-bold'>
          <MedalIcon className='w-4 h-4' />
          <span>Best</span>
        </div>

        <div className='flex justify-between'>
          <h2 className='text-xl font-semibold mb-2'>{article.title}</h2>
          <img
            src={article.image || 'https://via.placeholder.com/300'}
            alt={article.title}
            className='w-16 h-16 object-cover rounded-md mb-4'
          />
        </div>

        <div className='flex justify-between items-center text-sm text-gray-500'>
          <div className='flex gap-2'>
            <span>{article.writer.nickname}</span>
            <span className='flex justify-center items-center'>
              <HeartIcon className='w-4 h-4 mr-1' /> {article.likeCount}
            </span>
          </div>
          <span>{formatDate(article.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default BestArticleCard;
