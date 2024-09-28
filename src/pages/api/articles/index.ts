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
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { page = 1, pageSize = 10 } = req.query;
    // 게시글 목록 조회 로직
    const articles: Article[] = []; // 실제 데이터로 채워야 함
    res.status(200).json({ totalCount: articles.length, list: articles });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
