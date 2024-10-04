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

// 게시글 상세 정보 인터페이스 (기본 게시글 정보 + isLiked)
export interface ArticleDetail extends Article {
  isLiked: boolean; // 로그인한 사용자의 좋아요 여부
}

export interface ArticleListResponse {
  totalCount: number;
  list: Article[];
}

export type ArticleSortOption = "recent" | "like";
