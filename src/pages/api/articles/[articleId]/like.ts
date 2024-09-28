import type { NextApiRequest, NextApiResponse } from 'next';

type Article = {
  id: number;
  title: string;
  content: string;
  image: string;
  writer: {
    id: number;
    nickname: string;
  };
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { articleId } = req.query;

  if (req.method === 'POST') {
    // 게시글 좋아요 추가 로직
    const likedArticle: Article = {
      id: Number(articleId),
      title: '게시글 제목입니다.',
      content: '게시글 내용입니다.',
      image: 'string',
      writer: { id: 1, nickname: '닉네임' },
      likeCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isLiked: true,
    };
    res.status(200).json(likedArticle);
  } else if (req.method === 'DELETE') {
    // 게시글 좋아요 취소 로직
    const unlikedArticle: Article = {
      id: Number(articleId),
      title: '게시글 제목입니다.',
      content: '게시글 내용입니다.',
      image: 'string',
      writer: { id: 1, nickname: '닉네임' },
      likeCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isLiked: false,
    };
    res.status(200).json(unlikedArticle);
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
