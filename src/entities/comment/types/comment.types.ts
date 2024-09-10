export interface Comment {
  id: number;
  content: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
}
