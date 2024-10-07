interface IWriter {
  nickname: string;
  id: number;
}
export interface ISearchList {
  id: number;
  content: string;
  image: string | null;
  writer: IWriter;
  createdAt: string;
  likeCount: number;
}

interface IPostWriter {
  image: string;
  nickname: string;
  id: number;
}

export interface IComment {
  writer: IPostWriter;
  createdAt: string;
  content: string;
  id: number;
}