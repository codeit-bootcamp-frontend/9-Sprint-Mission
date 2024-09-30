export interface Writer {
  id: number;
  nickname: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface BoardsProps {
  bestPosts: Post[];
  posts: Post[];
  q: string | string[] | null;
}

export interface BestPosts {
  bestPosts: Post[];
}

export interface PostsProps {
  posts: Post[];
  q: string | string[] | null;
}

export interface GetQuery {
  orderBy: string;
  page: number;
  q?: string | string[] | null;
}
