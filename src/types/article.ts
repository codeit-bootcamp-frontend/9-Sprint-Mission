export type Article = {
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

export type ArticleListResponse = {
  totalCount: number;
  list: Article[];
};

export type ArticleDetailResponse = {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updateAt: string;
  writer: {
    id: number;
    nickname: string;
  };
  isLiked: boolean;
};

export type ArticleComment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
};

export type ArticleCommentResponse = {
  list: ArticleComment[];
  nextCursor: boolean;
};
