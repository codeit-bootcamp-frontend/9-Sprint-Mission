import { ReactNode } from "react";

export interface Writer {
  id: number;
  nickname: string;
}

export interface Articles {
  id: number;
  title: string;
  image: string;
  likeCount: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface Props{
  children: ReactNode;
  className: string;
}