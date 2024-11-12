interface ItemListType {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: {
    tag: string;
  }[];
  price: number;
  description: string;
  name: string;
  id: number;
}

export interface ItemType {
  totalCount: number;
  list: ItemListType[];
}
