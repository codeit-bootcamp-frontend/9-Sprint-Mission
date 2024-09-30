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
  nickname: string;
  id: number;
}

export interface ArticleProps<T> {
  article: T;
}

export interface ArticleParams {
  orderBy: ArticleSortOption;
  pageSize: number;
  keyword: string;
}

export interface ArticleResponse extends ArticleParams {
  list: Article[];
}
