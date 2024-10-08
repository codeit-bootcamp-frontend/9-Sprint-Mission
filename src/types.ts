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
  isLiked?: boolean;
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

// export interface IndividualPost extends Post {
//   isLiked: boolean;
// }

export interface Comment {
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

export interface DetailBoardProps {
  board: Post;
  comments: Comment[];
}
