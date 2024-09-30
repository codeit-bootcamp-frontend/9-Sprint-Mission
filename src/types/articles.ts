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

export interface ArticleProps {
  article: Article;
}

export interface ArticleListProps {
  articles: Article[];
}

export interface BoardsPageProps {
  totalArticles: Article[];
  bestArticles: Article[];
  initialBestArticles: Article[];
}
