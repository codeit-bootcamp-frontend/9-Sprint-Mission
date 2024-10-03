export interface ArticleForm {
  title: string;
  content: string;
  image?: string | null;
}

export interface Article {
  updatedAt: Date;
  createdAt: Date;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  content: string;
  title: string;
  id: number;
}

export interface ArticleListResponse {
  totalCount: number;
  list: Article[];
}

export type ArticleSortOption = "recent" | "like";
