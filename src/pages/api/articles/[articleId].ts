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
  isLiked?: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { articleId } = req.query;

  if (req.method === 'GET') {
    // 특정 게시글 조회 로직
    const article: Article = {
      id: Number(articleId),
      title: '게시글 제목입니다.',
      content: '게시글 내용입니다.',
      image: 'string',
      writer: { id: 1, nickname: '닉네임' },
      likeCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    res.status(200).json(article);
  } else if (req.method === 'PATCH') {
    const { title, content, image } = req.body;
    // 게시글 수정 로직
    const updatedArticle: Article = {
      id: Number(articleId),
      title,
      content,
      image,
      writer: { id: 1, nickname: '닉네임' },
      likeCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isLiked: true,
    };
    res.status(200).json(updatedArticle);
  } else if (req.method === 'DELETE') {
    // 게시글 삭제 로직
    res.status(200).json({ id: Number(articleId) });
  } else {
    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
