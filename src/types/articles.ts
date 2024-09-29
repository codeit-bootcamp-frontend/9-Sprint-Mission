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

export interface ArticleListProps {
  articles: Article[];
}

export interface ArticleProps {
  article: Article;
}
