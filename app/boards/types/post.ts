export interface PostList { 
  updatedAt: string;
  createdAt: string;
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

export interface PostType {
  totalCount: number;
  list: PostList[];
}
