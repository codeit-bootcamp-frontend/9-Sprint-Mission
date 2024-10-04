export type ArticleSortOption = "recent" | "like";

export interface Article {
  updatedAt: Date;
  createdAt: Date;
  likeCount: number;
  writer: ArticleWriter;
  image: string;
  content: string;
  title: string;
  id: number;
}

export interface ArticleWriter {
  image?: string;
  nickname: string;
  id: number;
}

export interface ArticleProps {
  articles: Article[];
}

export interface ArticleParams {
  orderBy: ArticleSortOption;
  pageSize: number;
  keyword?: string;
}

export interface ArticleResponse extends ArticleParams {
  list: Article[];
}

export interface ArticleComments {
  writer: ArticleWriter;
  updatedAt: Date;
  createdAt: Date;
  content: string;
  id: number;
}
