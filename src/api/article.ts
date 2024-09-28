import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from './axiosConfig';
import { ArticleListResponse } from '@/types/article';
/**
 * @article.ts
 * API 요청을 처리하는 서버 사이드 코드
    이 파일은 API 핸들러로, 클라이언트의 요청을 받아서 외부 API와 상호작용하여 결과를 클라이언트에 반환하는 역할을 합니다.
    handler 함수 내에서 GET, POST, DELETE 요청을 처리하며, 각 요청에 따라 적절한 함수를 호출합니다.
    getArticles 함수는 API를 호출하여 게시글 목록을 가져오고, 그 결과를 클라이언트에 반환합니다. 이때 axiosInstance를 사용하여 외부 API에 요청을 보냅니다.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.articleId) {
        return getArticleDetail(req, res);
      } else {
        const page = parseInt(req.query.page as string) || 1; // 페이지 번호 가져오기
        return getArticles(page, res); // 수정된 부분
      }
    case 'POST':
      return likeArticle(req, res);
    case 'DELETE':
      return unlikeArticle(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const getArticles =
  // 게시글 목록을 가져오는 함수
  // 외부 API에서 게시글 목록을 가져오고, 클라이언트에 JSON 형태로 응답
  async (
    page: number,
    res: NextApiResponse // res를 인수로 추가
  ): Promise<void> => {
    try {
      const response = await axiosInstance.get<ArticleListResponse>(
        '/articles',
        {
          params: {
            page,
            pageSize: 10,
            orderBy: 'recent',
          },
        }
      );
      // 응답을 클라이언트에 반환
      res.status(200).json(response.data); // list와 totalCount를 포함한 객체 반환
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      res.status(500).json({ message: 'Failed to fetch articles' }); // 에러 응답 처리
    }
  };

export const getArticleDetail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { articleId } = req.query;

  if (!articleId) {
    return res.status(400).json({ message: 'Invalid article ID' });
  }

  try {
    const response = await axiosInstance.get(`/articles/${articleId}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch article detail:', error);
    res.status(500).json({ message: 'Failed to fetch article detail' });
  }
};

export const likeArticle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { articleId } = req.query;

  if (!articleId) {
    return res.status(400).json({ message: 'Invalid article ID' });
  }

  try {
    const response = await axiosInstance.post(`/articles/${articleId}/like`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to like article:', error);
    res.status(500).json({ message: 'Failed to like article' });
  }
};

export const unlikeArticle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { articleId } = req.query;

  if (!articleId) {
    return res.status(400).json({ message: 'Invalid article ID' });
  }

  try {
    const response = await axiosInstance.delete(`/articles/${articleId}/like`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to unlike article:', error);
    res.status(500).json({ message: 'Failed to unlike article' });
  }
};
