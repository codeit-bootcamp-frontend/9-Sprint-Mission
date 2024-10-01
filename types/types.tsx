export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: string;
  createdAt: Date;
  writer: {
    id: number;
    nickname: string;
  };
}
