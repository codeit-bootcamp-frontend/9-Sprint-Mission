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
  isLiked?: boolean;
}
export interface ArticleResponse {
  list: Article[];
}

export interface ReplyResponse {
  list: Reply[];
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}
export interface States {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}
