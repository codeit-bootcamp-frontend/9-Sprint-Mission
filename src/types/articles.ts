export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  updatedAt: string;
  createdAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface ArticleComment {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: string;
}

export interface ArticleProps {
  article: Article;
  onClick: () => void;
}

export interface ArticleListProps {
  articles: Article[];
}

export interface BoardsPageProps {
  totalArticles: Article[];
  bestArticles: Article[];
  initialBestArticles: Article[];
}

export interface BoardDetailPageProps {
  articleInfo: Article;
  articleComments: ArticleComment[];
}
