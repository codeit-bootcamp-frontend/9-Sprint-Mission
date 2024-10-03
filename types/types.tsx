export interface Query {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}
export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}
export interface ArticleResponse {
  list: Article[];
}
