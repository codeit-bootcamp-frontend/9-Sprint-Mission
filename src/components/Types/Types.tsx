export type OrderBy = "recent" | "favorite";

export interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string;
  ownerId: number;
  favoriteCount: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

export interface Values {
  images: File | null;
  name: string;
  price: number;
  description: string;
  tags: string[];
}

export interface Comments {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}
