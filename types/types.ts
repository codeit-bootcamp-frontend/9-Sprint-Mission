import { ReactNode } from "react";

export interface Writer {
  id: number;
  nickname: string;
  image?: string;
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

export interface Comments {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface Props {
  children: ReactNode;
  className: string;
}

export interface Option {
  id: number;
  option: string;
  order: string;
}

