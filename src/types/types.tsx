import { ChangeEvent, FormEvent } from "react";

export interface FileInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, file: File | null) => void;
}

export interface ItemFormValues {
  imgFile: File | null;
  title: string;
  content: string;
  price: string;
  tags: { id: number; value: string }[];
}

export interface ItemFormProps {
  values: ItemFormValues;
  handleFileChange: (name: string, file: File | null) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleTagChange: (updatedItems: { id: number; value: string }[]) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export interface TagType {
  id: number;
  value: string;
}

export interface TagProps {
  name?: string;
  className?: string;
  values?: TagType[];
  onChange: (updatedTags: TagType[]) => void;
}

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price: number;
  favoriteCount?: number;
  images?: string;
  tags?: string[];
}

export interface CommentProps {
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

export interface CommentItemProps {
  item: CommentProps;
  onDelete: (id: number) => void;
}
