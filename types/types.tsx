export interface Post {
  id?: number;
  title?: string;
  content?: string;
  image?: string;
  likeCount?: number;
  createdAt?: string;
  writer?: {
    id?: number;
    nickname?: string;
  };
}

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  favoriteCount?: number;
  createdAt?: string;
  ownerNickname?: string;
  ownerId?: number;
  images?: string[];
  tags?: string[];
}
