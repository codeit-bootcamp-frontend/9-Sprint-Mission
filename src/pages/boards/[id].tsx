import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getArticleDetail,
  getArticleComments,
  createArticleComment,
} from '@/api/article';
import { ArticleDetailResponse, ArticleCommentResponse } from '@/types/article';
import Profile from '@/images/icons/ic_profile.svg';
import ArrowBack from '@/images/icons/ic_back.svg';
import Link from 'next/link';
// 시간 차이를 계산하는 함수 추가
function getTimeDifference(date: string) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
}

export default function BoardDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<ArticleDetailResponse | null>(null);
  const [comments, setComments] = useState<ArticleCommentResponse>({
    list: [],
    nextCursor: false,
  });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      fetchArticleDetail();
      fetchComments();
    }
  }, [id]);

  const fetchArticleDetail = async () => {
    try {
      const response = await getArticleDetail(Number(id));
      console.log('게시글', response);
      setArticle(response);
    } catch (error) {
      console.error('게시글 상세 정보를 불러오는데 실패했습니다:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getArticleComments(Number(id), 10);
      console.log('댓글', response);
      setComments(response);
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await createArticleComment(Number(id), newComment);
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('댓글 작성에 실패했습니다:', error);
    }
  };
  if (!article) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8 mt-16'>
      <h1 className='text-xl font-bold mb-4'>{article.title}</h1>
      <div className='flex gap-2 items-center text-sm text-gray-500'>
        <Profile width={32} height={32} alt='프로필' />
        <p className='text-gray-800'>{article.writer.nickname}</p>
        <p>{getTimeDifference(article.createdAt)}</p>
      </div>

      <hr className='my-4' />
      <p className='mb-4'>{article.content}</p>

      <h2 className='text-xl font-bold mb-2'>댓글달기</h2>
      <form
        onSubmit={handleCommentSubmit}
        className='flex flex-col items-end mb-4'
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='댓글을 입력하세요'
          className='bg-gray-100 rounded-md p-2 w-full h-28 placeholder:pl-2 pt-3'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md mt-2'
        >
          댓글 등록
        </button>
      </form>

      <div className='flex flex-col gap-10'>
        {comments.list.map((comment) => (
          <div key={comment.id} className='border-b  pb-4 bg-gray-50'>
            <p className='mb-6'>{comment.content}</p>
            <div className='flex gap-3 items-center'>
              <Profile width={32} height={32} alt='프로필' />
              <div className='text-sm text-gray-600'>
                <p>{comment.writer.nickname}</p>
                <p>{getTimeDifference(comment.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href='/boards' className='flex justify-center'>
        <p className='flex gap-5 bg-blue-500 px-10 py-4 justify-center items-center text-white rounded-3xl'>
          목록으로 돌아가기
          <ArrowBack
            width={32}
            alt='뒤로가기'
            className='text-white align-center'
          />
        </p>
      </Link>
    </div>
  );
}
