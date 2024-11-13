export interface CommentListResponse {
  nextCursor: number;
  list: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  writer: CommentWriter;
  updatedAt: Date;
  createdAt: Date;
}

export interface CommentWriter {
  id: number;
  image: string | null;
  nickname: string | null;
}
