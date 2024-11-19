export interface ItemListType {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
}

export interface ItemType {
  totalCount: number;
  list: ItemListType[];
}

interface CommentListType { 
  writer: {
    image: string | null;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface CommentType {
  nextCursor: number | null;
  list: CommentListType[];
}
